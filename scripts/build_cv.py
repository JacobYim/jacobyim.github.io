from pathlib import Path
import re,html
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
root=Path(__file__).resolve().parents[1]
s=(root/'_pages/cv.html').read_text().split('<main>',1)[1].split('</main>',1)[0]
s=re.sub(r'<div class="dated"><div>(.*?)</div><time>(.*?)</time></div>',lambda m:'<p class="dated"><b>'+m[2]+'</b> · '+m[1]+'</p>',s)
styles={'h1':ParagraphStyle('name',fontName='Times-Bold',fontSize=21,leading=24,alignment=TA_CENTER,spaceAfter=5),'h2':ParagraphStyle('section',fontName='Times-Bold',fontSize=11,leading=13,spaceBefore=9,spaceAfter=4,keepWithNext=True),'h3':ParagraphStyle('role',fontName='Times-Bold',fontSize=10,leading=12,spaceBefore=5,spaceAfter=2,keepWithNext=True),'p':ParagraphStyle('body',fontName='Times-Roman',fontSize=10,leading=11.5,spaceAfter=4)}
story=[]
styles['dated']=ParagraphStyle('dated',parent=styles['p'],keepWithNext=True)
for tag,attrs,body in re.findall(r'<(h1|h2|h3|p)\b([^>]*)>(.*?)</\1>',s,re.S):
 body=body.replace('’',"'").replace('–','-').replace('—','-').replace('⋅','·')
 story.append(Paragraph(body,styles['dated'] if 'dated' in attrs else styles[tag]))
def footer(c,doc):
 c.setFont('Times-Roman',8);c.setFillColor(colors.grey);c.drawString(36,22,'Junghwan Yim | Updated November 2026');c.drawRightString(576,22,str(doc.page))
SimpleDocTemplate(str(root/'assets/documents/Junghwan-Yim-CV.pdf'),pagesize=(612,792),leftMargin=36,rightMargin=36,topMargin=30,bottomMargin=36).build(story,onFirstPage=footer,onLaterPages=footer)
