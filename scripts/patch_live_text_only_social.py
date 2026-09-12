from pathlib import Path

p=Path('scripts/apply_seo_metadata.cjs')
s=p.read_text(encoding='utf-8')
s=s.replace("const homeSocialImage=`${base}/assets/bhoc-platform-social-preview-20260910.png`;\n","")
old="""  const socialTitle=data.socialTitle||data.title;
  const articleAuthor=data.type==='article'?`\\n  <meta property=\"article:author\" content=\"${authorProfile}\">`:'';
  const home=file==='index.html';
  const socialImageAlt='Precision Oxygen Therapeutics - BHOC Biological Hemoglobin Oxygen Carrier';
  const socialImage=home?`\\n  <meta property=\"og:image\" content=\"${homeSocialImage}\">\\n  <meta property=\"og:image:secure_url\" content=\"${homeSocialImage}\">\\n  <meta property=\"og:image:width\" content=\"1200\">\\n  <meta property=\"og:image:height\" content=\"630\">\\n  <meta property=\"og:image:type\" content=\"image/png\">\\n  <meta property=\"og:image:alt\" content=\"${socialImageAlt}\">`:'';
  const twitterImage=home?`\\n  <meta name=\"twitter:image\" content=\"${homeSocialImage}\">\\n  <meta name=\"twitter:image:alt\" content=\"${socialImageAlt}\">`:'';
"""
new="""  const home=file==='index.html';
  const socialTitle=home?'BHOC Scientific Evidence':(data.socialTitle||data.title);
  const socialDescription=home?'Source-linked evidence on BHOC, HBOC and oxygen delivery.':data.description;
  const articleAuthor=data.type==='article'?`\\n  <meta property=\"article:author\" content=\"${authorProfile}\">`:'';
"""
if old not in s: raise SystemExit('generator block not found')
s=s.replace(old,new)
s=s.replace('${articleAuthor}${socialImage}', '${articleAuthor}')
s=s.replace('content=\"${escapeAttr(data.description)}\">\\n  <meta property=\"og:url\"', 'content=\"${escapeAttr(socialDescription)}\">\\n  <meta property=\"og:url\"')
s=s.replace('<meta name=\"twitter:card\" content=\"${home?\'summary_large_image\':\'summary\'}\">', '<meta name=\"twitter:card\" content=\"summary\">')
s=s.replace('content=\"${escapeAttr(data.description)}\">${twitterImage}`;', 'content=\"${escapeAttr(socialDescription)}\">`;')
p.write_text(s,encoding='utf-8')

p=Path('tests/seo.test.cjs')
t=p.read_text(encoding='utf-8')
t=t.replace("const homeSocialImage='https://archiljali.github.io/BHOC-platform/assets/bhoc-platform-social-preview-20260910.png';\n","")
start=t.index('    if(isHome){')
end=t.index('    assert.ok(source.includes(`<link rel=\"icon\"', start)
replacement="""    assert.ok(!source.includes('property=\"og:image\"'),`${file}: OG image should be absent`);
    assert.ok(!source.includes('name=\"twitter:image\"'),`${file}: Twitter image should be absent`);
    assert.ok(source.includes('name=\"twitter:card\" content=\"summary\"'),`${file}: Twitter card missing`);
    if(isHome){
      assert.ok(source.includes('property=\"og:title\" content=\"BHOC Scientific Evidence\"'),`${file}: compact social title missing`);
      assert.ok(source.includes('property=\"og:description\" content=\"Source-linked evidence on BHOC, HBOC and oxygen delivery.\"'),`${file}: compact social description missing`);
    }
"""
t=t[:start]+replacement+t[end:]
# Remove the obsolete homepage-image dimension test.
marker="test('homepage WhatsApp social preview remains a valid 1200 by 630 PNG',()=>{"
if marker in t:
    a=t.index(marker)
    b=t.index("\n\ntest('every shared platform header",a)
    t=t[:a]+t[b+2:]
p.write_text(t,encoding='utf-8')
