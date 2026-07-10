# İrem & Tolgahan Düğün Davetiyesi

Mobil öncelikli Next.js düğün davetiyesi. Katılım formu yalnızca sunucu tarafındaki API üzerinden Supabase'e yazılır; misafir tarayıcısına servis rolü anahtarı gönderilmez.

## Kurulum

1. `npm install` çalıştırın.
2. `.env.example` dosyasını `.env.local` olarak kopyalayıp değerleri doldurun.
3. Supabase SQL Editor'da `supabase/schema.sql` dosyasını çalıştırın.
4. Supabase Authentication > Users bölümünden yönetici hesabını oluşturun; e-postasını `ADMIN_EMAILS` içine ekleyin.
5. `npm run dev` ile başlatın.

Vercel'e `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` ve `ADMIN_EMAILS` değişkenlerini ekleyin. Servis rolü anahtarını asla `NEXT_PUBLIC_` önekiyle eklemeyin. `/yonetim` sayfası yalnızca `ADMIN_EMAILS` izin listesinde olan Supabase kullanıcılarına yanıtları gösterir.
