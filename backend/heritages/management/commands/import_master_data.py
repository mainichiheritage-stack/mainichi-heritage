import json
import os
from django.core.management.base import BaseCommand
from django.db import transaction
from heritages.models import Heritage, Country, Criterion, Quiz, Notification
from django.core.management import call_command
class Command(BaseCommand):
    help = 'JSONからマスターデータをインポートし、DBを同期します'

    def add_arguments(self, parser):
        # --reset オプションを追加
        parser.add_argument(
            '--reset',
            action='store_true',
            help='インポート前にデータベースを完全に初期化します',
        )

    def handle(self, *args, **options):
        input_dir = 'master_data'
        
        if not os.path.exists(input_dir):
            self.stdout.write(self.style.ERROR(f'ディレクトリ "{input_dir}" が見つかりません。'))
            return

        try:
            # --reset が指定されたときだけ flush する
            if options['reset']:
                self.stdout.write(self.style.WARNING('データベースをリセット中...'))
                call_command('flush', '--no-input')
                
            # トランザクション：全データの一貫性を保証
            with transaction.atomic():
                self._import_countries(os.path.join(input_dir, 'countries.json'))
                self._import_criteria(os.path.join(input_dir, 'criteria.json'))
                self._import_heritages(os.path.join(input_dir, 'heritages.json'))
                self._import_quizzes(os.path.join(input_dir, 'quizzes.json'))
                self._import_notifications(os.path.join(input_dir, 'notifications.json'))

            self.stdout.write(self.style.SUCCESS('--- 全データの同期が正常に完了しました！ ---'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'致命的なエラーが発生しました: {e}'))

    def _import_countries(self, path):
        self.stdout.write('Countries をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                Country.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'name': item['name'],
                        'region': item.get('region', '')
                    }
                )

    def _import_criteria(self, path):
        self.stdout.write('Criteria をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                Criterion.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'number': item.get('number'),
                        'short_name': item.get('short_name', ''),
                        'description': item.get('description', '')
                    }
                )

    def _import_heritages(self, path):
        self.stdout.write('Heritages をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                heritage, _ = Heritage.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'name': item['name'],
                        'category': item['category'],
                        'catchphrase': item.get('catchphrase', ''),
                        'description': item.get('description', ''),
                        'registered_year': item.get('registered_year'),
                        'is_danger': item.get('is_danger', False),
                        'level': item.get('level', 2),
                        'image_url': item.get('image_url', ''),
                        'source_name': item.get('source_name', ''),
                        'source_url': item.get('source_url', ''),
                    }
                )
                if 'country_codes' in item:
                    heritage.countries.set(Country.objects.filter(code__in=item['country_codes']))
                if 'criteria_codes' in item:
                    heritage.criteria.set(Criterion.objects.filter(code__in=item['criteria_codes']))

    def _import_quizzes(self, path):
        self.stdout.write('Quizzes をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            heritage_map = {h.code: h for h in Heritage.objects.all()}
            for item in data:
                heritage = heritage_map.get(item['heritage_code'])
                if not heritage:
                    continue
                Quiz.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'heritage': heritage,
                        'question': item['question'],
                        'choice_correct': item['choice_correct'],
                        'choice_distractor1': item['choice_distractor1'],
                        'choice_distractor2': item['choice_distractor2'],
                        'choice_distractor3': item['choice_distractor3'],
                        'explanation': item.get('explanation', ''),
                        'tips': item.get('tips', ''),
                        'difficulty': item.get('difficulty', 2),
                    }
                )

    def _import_notifications(self, path):
        """お知らせデータのインポート (ファイルがない場合はスキップ)"""
        if not os.path.exists(path):
            self.stdout.write(self.style.WARNING(f'警告: {path} が見つからないためスキップします。'))
            return

        self.stdout.write('Notifications をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                Notification.objects.update_or_create(
                    title=item['title'],
                    defaults={
                        'content': item.get('content', ''),
                        'category': item.get('category', 'info'),
                        'published_at': item.get('published_at'),
                    }
                )