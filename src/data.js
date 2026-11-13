const mail=s=>`mailto:cgconfrence@connector.global?subject=${encodeURIComponent(s)}`;
const RATE={PKR:278,INR:88,GBP:.75,EUR:.88,AED:3.67,SAR:3.75,CAD:1.41,AUD:1.43,SGD:1.29,MYR:4.2},CUR={PK:'PKR',IN:'INR',GB:'GBP',AE:'AED',SA:'SAR',CA:'CAD',AU:'AUD',SG:'SGD',MY:'MYR',DE:'EUR',FR:'EUR',ES:'EUR',IT:'EUR',NL:'EUR'};
const cur=CUR[((navigator.language||'').split('-')[1]||'').toUpperCase()];
const loc=u=>cur?` About ${Math.round(u*RATE[cur]).toLocaleString()} ${cur} locally (indicative).`:'';
const eb=()=>{const d=Math.ceil((Date.UTC(2026,10,15,23,59)-Date.now())/864e5);return d>0?`Early bird closes 15 Nov 2026, ${d} day${d>1?'s':''} from now. Registration opens 16 Nov.`:'Registration is open until 31 Dec 2026.'};
const R=[
{id:'lobby',n:'Lobby',m:0,ov:'Welcome to C.g Conference 2027, Use of AI in Education. Follow the guide through each room, one exhibit at a time.',dk:['Welcome',-2.6],it:[
['When and where','21–23 January 2027, Thursday to Saturday. Sessions run from 12:00 GMT, fully online.'],
['Who it’s for','Educators, education leaders, EdTech founders, AI professionals and students.'],
['Early bird',eb]]},
{id:'themes',n:'Hall of Themes',m:.25,ov:'Four sub themes shape the conference. Step up to each case.',it:[
['Personalized Learning & Intelligent Tutoring','Adaptive systems and AI tutors that meet each learner where they are.'],
['Cognitive Engagement vs. Shortcut Culture','Keeping students thinking when answers are one prompt away.'],
['Teacher Workflow & Administrative Automation','Giving teachers and administrators their time back.'],
['AI Literacy, Data Privacy, Security & Equity','Competency frameworks, safe data practice and fair access.']]},
{id:'sdg',n:'SDG Gallery',m:.5,ov:'Seven UN Sustainable Development Goals guide the themes and discussions.',it:[
['SDG 4 · Quality Education','Inclusive and equitable quality education for all.'],
['SDG 5 · Gender Equality','Equal opportunity and participation for women and girls.'],
['SDG 8 · Decent Work and Economic Growth','Productive work, skills and sustainable growth.'],
['SDG 9 · Industry, Innovation and Infrastructure','Resilient infrastructure, innovation and technology.'],
['SDG 10 · Reducing Inequalities','Reduced inequality within and among countries.'],
['SDG 16 · Peace, Justice & strong Institutions','Peaceful, just and strong institutions.'],
['SDG 17 · Partnerships for the Goals','Partnerships that help deliver every goal.']]},
{id:'agenda',n:'Agenda Corridor',m:.6,ov:'Three days online, timed in GMT: two days of presentations and a half day of connection.',it:[
['Day 1 · Thu 21 Jan','Foundations and the learning experience. Opening 12:00, Keynote 1 at 12:20, Themes 1 and 2, then Panel 1.'],
['Day 2 · Fri 22 Jan','Practice, policy and risk. Keynote 2 at 12:10, Themes 3 to 5, then Panels 2 and 3.'],
['Day 3 · Sat 23 Jan','Connection, recognition and partners (half day). Networking Circle, prize distribution and the Sponsors and Partners Limelight.']]},
{id:'aud',n:'Auditorium',m:.85,ov:'Keynotes and panels. Speaker names will be announced here; keynote and panel seats are open to sponsors and strategic partners.',it:[
['Keynote 1','The state of AI in education. Thu 21 Jan, 12:20 GMT.'],
['Keynote 2','AI literacy and competency frameworks. Fri 22 Jan, 12:10 GMT.'],
['Panel 1','Partner or shortcut? Restructuring assignments and assessments. Thu 21 Jan.'],
['Panel 2','Can we trust AI detectors? Process-based assessment and academic integrity. Fri 22 Jan, 15:35 GMT.'],
['Panel 3','Equity, access, and the hidden costs of third-party AI. Fri 22 Jan.'],
['Networking Circle','Breakout rooms by theme, with facilitators. Sat 23 Jan, 2 hours.']]},
{id:'trophy',n:'Trophy Hall',m:.8,ov:'Seven categories for researchers, practitioners, students and groups.',it:[
['Best Research Presentation','Cash plus fast-track publication.'],
['Most Innovative Classroom Practice','Grant or funds.'],
['Best Student / Early-Career Presentation','Mentorship plus premium bundle (K.I.A).'],
['Best Group Presentation','Team prize split among members, or a bundled institutional offer.'],
['Most Impactful Discussion','Research grant, awarded from the Networking Circle.'],
['Equity & Access Award','Grant.'],
['Audience Choice','Visibility package plus vouchers.']]},
{id:'patrons',n:'Patrons’ Wall',m:.6,ov:'Four sponsor tiers and four partner tiers for organisations that want to take part.',it:[
['Diamond sponsor · $3,000',()=>'Exclusive branding. Keynote slot and full attendee opt-in data.'+loc(3000)],
['Gold sponsor · $1,500',()=>'Thought leadership. Dedicated panel session and virtual workshop.'+loc(1500)],
['Silver sponsor · $800',()=>'Lead generation. Dedicated virtual booth and mid-level branding.'+loc(800)],
['Community sponsor · $250',()=>'Brand awareness. Logo placement and virtual product demo track.'+loc(250)],
['Strategic Partner','Universities, policy or international bodies, major associations.'],
['Knowledge Partner','Research centers, partner journals, publishers, think tanks.'],
['Community Partner','Student societies, teacher networks, NGOs, research communities.'],
['Media Partner','Education and tech publications, podcasts, newsletters.']]},
{id:'dates',n:'Timeline Floor',m:.45,fl:1,ov:'Key dates from partnership opening on 1 Nov 2026 to closing on 31 Dec 2026. Walk the tiles in order.',it:[
['01 Nov 2026','Open for partnership.'],['02 Nov 2026','Early bird discount opens.'],['03 Nov 2026','Sponsorships open.'],['04 Nov 2026','Abstract submissions open.'],
['15 Nov 2026','Early bird discount closes.'],['16 Nov 2026','Registration opens.'],['29 Dec 2026','Abstract submissions close.'],['31 Dec 2026','Registrations, sponsorships and partnerships close.']]},
{id:'exit',n:'Exit Desk',m:0,ov:'Attend, present, sponsor or partner. 10% of total revenue is distributed among the partner NGOs.',dk:['Take part',0],it:[]}];
const N=R.length,TOURS={all:[0,1,2,3,4,5,6,7,8],edu:[0,1,3,4,5,7,8],stu:[0,1,3,5,7,8],biz:[0,2,4,6,7,8],res:[0,1,2,3,5,7,8]};
const CTA=[['Register Now','Registering for C.g Conference 2027'],['Submit an abstract','Abstract submission, C.g Conference 2027'],['Become a sponsor','Sponsorship enquiry, C.g Conference 2027'],['Become a partner','Partnership enquiry, C.g Conference 2027']],ORD={biz:[2,3,0,1],res:[1,0,2,3]};
const body=i=>typeof i[1]=='function'?i[1]():i[1];
export {R,TOURS,CTA,ORD,body,mail}
