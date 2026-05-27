import React from "react";
import {
  Lock,
  Eye,
  FileText,
  ShieldCheck,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "2026年5月27日";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-slate-500 text-sm">最終更新日: {lastUpdated}</p>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <FileText className="text-indigo-500" size={20} />
              1. 収集する情報
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              当アプリでは、サービスの提供および向上を目的として、以下の情報を収集する場合があります。
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-2">
              <li>クイズの回答結果、正解率などの学習履歴</li>
              <li>端末情報（OSの種類、ブラウザの種類など）</li>
              <li>Cookie（クッキー）を利用した利用状況の統計データ</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <Eye className="text-indigo-500" size={20} />
              2. 情報の利用目的
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              収集した情報は、以下の目的でのみ利用いたします。
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-2 mt-4">
              <li>ユーザーごとの学習進捗管理および苦手分野の分析</li>
              <li>サービスの改善、不具合修正、および新機能の開発</li>
              <li>お問い合わせへの対応</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <ShieldCheck className="text-indigo-500" size={20} />
              3. 第三者への提供
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              当アプリは、法令に基づく場合を除き、ユーザーの同意を得ることなく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-800">
              4. アクセス解析ツールについて
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-800">
              5. 広告の配信について
            </h2>
            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>
                当サイトでは、第三者配信の広告サービス「Googleアドセンス」およびその他の広告配信事業者が提供する広告を掲載しています。
              </p>
              <p>
                これら広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。
              </p>
              <p>
                ユーザーは、Googleの広告設定（
                <a
                  href="https://adssettings.google.com/authenticated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-700"
                >
                  https://adssettings.google.com/authenticated
                </a>
                ）から、パーソナライズ広告を無効にすることができます。また、
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-700"
                >
                  www.aboutads.info
                </a>
                にアクセスするか、お使いのブラウザの設定でCookieを無効にすることにより、第三者配信事業者のCookieによるパーソナライズ広告の配信を停止できます。
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-800">
              <Mail className="text-indigo-500" size={20} />
              6. お問い合わせ
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              プライバシーポリシーに関するご質問や、個人情報の取り扱いに関するお問い合わせは、以下のフォームよりご連絡ください。
            </p>
            <Link
              href="https://forms.gle/nydMBWr1UyAXJZ3a6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              お問い合わせフォームはこちら
              <ExternalLink size={16} className="ml-2" />
            </Link>
          </section>
        </div>

        <div className="text-center mt-12 text-slate-400 text-xs px-4">
          当プラットフォームは、世界遺産を愛するすべての人々が安心して学べる環境作りを約束します。
        </div>
      </div>
    </div>
  );
}
