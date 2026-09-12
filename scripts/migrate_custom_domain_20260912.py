from pathlib import Path

root=Path('.')
old='https://archiljali.github.io/BHOC-platform'
new='https://evidence.bhoctherapeutics.com'
old_vet='https://archiljali.github.io/BHOC-VET-platform/'
new_vet='https://evidence.bhocvet.com/'
exts={'.html','.css','.js','.cjs','.json','.xml','.md','.py','.txt'}
skip_parts={'.git','node_modules','backups','backup'}
changed=[]
for p in root.rglob('*'):
    if not p.is_file() or p.suffix.lower() not in exts:
        continue
    if any(part in skip_parts for part in p.parts):
        continue
    try:
        s=p.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    t=s.replace(old_vet,new_vet).replace(old,new)
    # GitHub project-root absolute paths become custom-domain-root absolute paths.
    t=t.replace('/BHOC-platform/','/')
    if t!=s:
        p.write_text(t,encoding='utf-8')
        changed.append(str(p))
print('\n'.join(changed))
