import json
import os
from django.core.management.base import BaseCommand
from django.db import transaction, connection
from django.core.management import call_command
from heritages.models import Heritage, HeritageSection, Country, Criterion, Quiz, Notification

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
            # --reset が指定されたときだけデータベースをクリーンにする
            if options['reset']:
                self.stdout.write(self.style.WARNING('データベースをリセット中...'))
                call_command('flush', '--no-input')
                
                # IDシーケンスを 1 にリセット
                self.stdout.write('対象テーブルのIDシーケンスをリセット中...')
                self._reset_id_sequences()
                
            # トランザクション：全データの一貫性を保証
            with transaction.atomic():
                self._import_countries(os.path.join(input_dir, 'countries.json'))
                self._import_criteria(os.path.join(input_dir, 'criteria.json'))
                self._import_heritages(os.path.join(input_dir, 'heritages.json'))
                self._import_heritage_sections(os.path.join(input_dir, 'heritage_sections.json'))
                self._import_quizzes(os.path.join(input_dir, 'quizzes.json'))
                self._import_notifications(os.path.join(input_dir, 'notifications.json'))

            self.stdout.write(self.style.SUCCESS('--- 全データの同期が正常に完了しました！ ---'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'致命的なエラーが発生しました: {e}'))

    def _reset_id_sequences(self):
        """
        インポート対象のテーブル（および多対多の中間テーブル）のシーケンスを 1 に巻き戻す
        """
        # シーケンスをリセットしたいモデルのリスト
        target_models = [
            Country,
            Criterion,
            Heritage,
            HeritageSection,
            Quiz,
            Notification
        ]

        with connection.cursor() as cursor:
            # 1. 各メインテーブルのシーケンスをリセット
            for model in target_models:
                table_name = model._meta.db_table
                sql = f"ALTER SEQUENCE IF EXISTS {table_name}_id_seq RESTART WITH 1;"
                cursor.execute(sql)

            # 2. Heritage と Country / Criterion の多対多（ManyToMany）の中間テーブルもリセット
            # ※ flush すると中間テーブルの ID もリセットされるため
            m2m_tables = [
                Heritage.countries.through._meta.db_table,
                Heritage.criteria.through._meta.db_table
            ]
            for table_name in m2m_tables:
                sql = f"ALTER SEQUENCE IF EXISTS {table_name}_id_seq RESTART WITH 1;"
                cursor.execute(sql)

    def _import_countries(self, path):
        self.stdout.write('Countries をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                Country.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'name': item['name'],
                        'region': item.get('region', 1)
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
                        'catchphrase': item.get('catchphrase'),
                        'registered_year': item.get('registered_year'),
                        'level': item.get('level', 2),
                        'is_danger': item.get('is_danger', False),
                        'danger_registered_year': item.get('danger_registered_year'),
                        'is_negative_heritage': item.get('is_negative_heritage', False),
                        'is_cultural_landscape': item.get('is_cultural_landscape', False),
                        'source_name': item.get('source_name'),
                        'source_url': item.get('source_url'),
                    }
                )
                if 'country_codes' in item:
                    heritage.countries.set(Country.objects.filter(code__in=item['country_codes']))
                if 'criteria_codes' in item:
                    heritage.criteria.set(Criterion.objects.filter(code__in=item['criteria_codes']))

    def _import_heritage_sections(self, path):
        """世界遺産解説セクションデータのインポート"""
        if not os.path.exists(path):
            self.stdout.write(self.style.WARNING(f'警告: {path} が見つからないためスキップします。'))
            return

        self.stdout.write('HeritageSections をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
            # 高速化のために Heritage のコードとインスタンスのマッピングを用意
            heritage_map = {h.code: h for h in Heritage.objects.all()}
            
            for item in data:
                h_code = item.get('heritage_code')
                heritage = heritage_map.get(h_code)
                if not heritage:
                    self.stdout.write(self.style.ERROR(f'エラー: Heritageコード "{h_code}" が存在しません。セクションをスキップします。'))
                    continue

                HeritageSection.objects.update_or_create(
                    heritage_code=heritage,
                    sort_order=item['sort_order'],
                    section_type=item.get('section_type', 'point'),
                    title=item.get('title'),
                    defaults={
                        'section_type': item.get('section_type', 'point'),
                        'target_level': item.get('target_level'),
                        'title': item.get('title'),
                        'content': item.get('content', ''),
                        'image_code': item.get('image_code'),
                        'source_name': item.get('source_name'),
                        'source_url': item.get('source_url'),
                    }
                )

    def _import_quizzes(self, path):
        self.stdout.write('Quizzes をインポート中...')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            heritage_map = {h.code: h for h in Heritage.objects.all()}
            for item in data:
                h_code = item.get('heritage_code')
                heritage = heritage_map.get(h_code) if h_code else None
                
                Quiz.objects.update_or_create(
                    code=item['code'],
                    defaults={
                        'heritage': heritage,
                        'question': item['question'],
                        'choice_correct': item['choice_correct'],
                        'choice_distractor1': item['choice_distractor1'],
                        'choice_distractor2': item['choice_distractor2'],
                        'choice_distractor3': item['choice_distractor3'],
                        'explanation': item.get('explanation'),
                        'tips': item.get('tips'),
                        'difficulty': item.get('difficulty', 1),
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
                        'category': item.get('category', 9),
                        'published_at': item.get('published_at'),
                    }
                )