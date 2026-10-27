"""Assemble native Figma PDF exports without rasterizing text or vectors."""
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject, ArrayObject
import argparse, json, hashlib, re

parser=argparse.ArgumentParser()
parser.add_argument('--output-dir',type=Path,required=True)
parser.add_argument('--overview',type=Path,required=True)
parser.add_argument('--export-map',type=Path,required=True)
args=parser.parse_args()
out=args.output_dir
maps=json.loads(args.export_map.read_text(encoding='utf-8'))
parts=[
 ('Document guide',args.overview,maps['others'][0]['pages']),
 ('Style assets',out/'IntellectualData_01_StyleAssets_v1.3_20261028.pdf',maps['style']['pages']),
 ('Operations',out/'IntellectualData_02_Operations_v1.3_20261028.pdf',maps['others'][1]['pages']),
 ('Technical handover',out/'IntellectualData_03_TechnicalHandover_v1.3_20261028.pdf',maps['others'][2]['pages'])
]
def target(uri):
 if not uri:return None
 p=urlparse(str(uri))
 if p.hostname not in ['www.figma.com','figma.com'] or 'P26QUGlLFvZEWn5VOEDZtC' not in p.path:return None
 node=parse_qs(p.query).get('node-id',[None])[0]
 return node.replace('-',':') if node else None

def localize(writer,lookup):
 count=0
 for page in writer.pages:
  for ref in page.get('/Annots',[]):
   a=ref.get_object(); action=a.get('/A')
   if not action:continue
   action=action.get_object()
   dest=lookup.get(target(action.get('/URI')))
   if dest is None:continue
   a[NameObject('/A')]=DictionaryObject({
    NameObject('/S'):NameObject('/GoTo'),
    NameObject('/D'):ArrayObject([writer.pages[dest].indirect_reference,NameObject('/Fit')])
   })
   count+=1
 return count

readers=[]
for title,path,pages in parts:
 reader=PdfReader(path)
 if len(reader.pages)!=len(pages):raise ValueError(f'Page count differs: {title}')
 readers.append(reader)
writer=PdfWriter();lookup={};offset=0
for (title,path,pages),reader in zip(parts,readers):
 writer.append(reader,import_outline=False)
 root=writer.add_outline_item(title,offset)
 for j,p in enumerate(pages):
  lookup[p['sourceId']]=offset+j
  writer.add_outline_item(p['name'],offset+j,parent=root)
 offset+=len(pages)
combined_links=localize(writer,lookup)
writer.add_metadata({'/Title':'Intellectual Data - Website operation and handover','/Subject':'v1.3 / 2026-10-28 / native Figma exports / 96 pages','/Author':'Nine One Labs','/Creator':'Figma native PDF + pypdf assembly'})
combined=out/'IntellectualData_CompleteGuide_v1.3_20261028.pdf'
with combined.open('wb') as f:writer.write(f)
standalone=[]
for (title,path,pages),reader in zip(parts[1:],readers[1:]):
 w=PdfWriter();w.append(reader,import_outline=False)
 count=localize(w,{p['sourceId']:j for j,p in enumerate(pages)})
 for j,p in enumerate(pages):w.add_outline_item(p['name'],j)
 w.add_metadata({'/Title':'Intellectual Data - '+title,'/Subject':'v1.3 / 2026-10-28','/Author':'Nine One Labs'})
 temp=path.with_suffix('.tmp.pdf')
 with temp.open('wb') as f:w.write(f)
 temp.replace(path)
 standalone.append({'file':path.name,'internalLinks':count})
final=PdfReader(combined)
assert len(final.pages)==96
checks=[]
for path in list(out.glob('*.pdf')):
 r=PdfReader(path);full='\n'.join(p.extract_text() for p in r.pages)
 bad=[s for s in ['이미지 삽입','도메인·DNS·SSL 운영','플랜·결제·갱신 확인','계약 범위·제외·별도 협의','PDF 배포·판본 관리'] if s in full]
 if bad:raise ValueError(f'Excluded/placeholder content in {path}: {bad}')
 checks.append({'file':path.name,'pages':len(r.pages),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'textCharacters':len(full),'pageSizes':sorted(set((float(p.mediabox.width),float(p.mediabox.height)) for p in r.pages)),'excludedHeadings':bad})
report={'date':'2026-10-28','version':'v1.3','nativeExports':True,'combinedInternalLinks':combined_links,'standaloneLinks':standalone,'files':checks,'visualReview':'pending'}
(out/'pdf-acceptance.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
