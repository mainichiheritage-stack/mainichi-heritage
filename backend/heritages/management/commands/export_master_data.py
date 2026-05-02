import json
import os
from django.core.management.base import BaseCommand
from heritages.models import Heritage, Country, Criterion, Quiz, Notification

class Command(BaseCommand):
    help = '各テーブルのデータをcodeベースのリレーションでJSON出力します'

    def handle(self, *args, **options):
        # 出力ディレクトリの作成
        output_dir = 'master_data'
        os.makedirs(output_dir, exist_ok=True)

        # 1. 国マスタの書き出し
        countries = []
        for c in Country.objects.all().order_by('code'):
            countries.append({
                "code": c.code,
                "name": c.name,
                "region": c.region,
            })
        self._write_json(os.path.join(output_dir, 'countries.json'), countries)

        # 2. 登録基準マスタの書き出し
        criteria = []
        for cr in Criterion.objects.all().order_by('code'):
            criteria.append({
                "code": cr.code,
                "number": cr.number,
                "short_name": cr.short_name,
                "description": cr.description,
            })
        self._write_json(os.path.join(output_dir, 'criteria.json'), criteria)

        # 3. 世界遺産データの書き出し (中間テーブルをcodeに変換)
        heritages = []
        for h in Heritage.objects.all().order_by('code'):
            heritages.append({
                "code": h.code,
                "name": h.name,
                "category": h.category,
                "catchphrase": h.catchphrase,
                "description": h.description,
                "registered_year": h.registered_year,
                "is_danger": h.is_danger,
                "level": h.level,
                "image_url": h.image_url,
                "source_name": h.source_name,
                "source_url": h.source_url,

                # 中間テーブル
                "country_codes": list(h.countries.values_list('code', flat=True).order_by('code')),
                "criteria_codes": list(h.criteria.values_list('code', flat=True).order_by('code')),
            })
        self._write_json(os.path.join(output_dir, 'heritages.json'), heritages)

        # 4. クイズデータの書き出し (親遺産をcodeで指定)
        quizzes = []
        for q in Quiz.objects.all().order_by('code'):
            quizzes.append({
                "code": q.code,
                "heritage_code": q.heritage.code if q.heritage else None,
                "question": q.question,
                "choice_correct": q.choice_correct,
                "choice_distractor1": q.choice_distractor1,
                "choice_distractor2": q.choice_distractor2,
                "choice_distractor3": q.choice_distractor3,
                "explanation": q.explanation,
                "tips": q.tips,
                "difficulty": q.difficulty,
            })
        self._write_json(os.path.join(output_dir, 'quizzes.json'), quizzes)

        # 5. お知らせ（Notification）データの書き出し
        notifications = []
        for n in Notification.objects.all().order_by('published_at'):
            notifications.append({
                "title": n.title,
                "content": n.content,
                "category": n.category,
                "published_at": n.published_at.isoformat() if n.published_at else None,
            })
        self._write_json(os.path.join(output_dir, 'notifications.json'), notifications)

        self.stdout.write(self.style.SUCCESS('マスターデータの書き出しが完了しました！'))

    def _write_json(self, path, data):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)