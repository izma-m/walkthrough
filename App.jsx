import {useState,useMemo} from 'react';import Museum from './Scene';import {camFor} from './geo';import {R,TOURS,CTA,ORD,body,mail} from './data';
const SLOT=['bl','tr','br','tl','cr','cl'],ROLES=[['edu','Educator or education leader','Themes, agenda, panels, classroom prize'],['stu','Student or volunteer','Themes, agenda, early-career prize, dates'],['biz','Business owner or EdTech founder','Goals, keynotes, sponsor and partner tiers'],['res','Researcher or presenter','Themes, agenda, prizes, abstract dates'],['all','Show me everything','All nine rooms']];
export default function App(){
const [ph,setPh]=useState('intro'),[role,setRole]=useState('all'),[quick,setQuick]=useState(false),[cur,setCur]=useState(0);
const tour=TOURS[role],S=useMemo(()=>tour.flatMap(ri=>[{ri,k:-1},...(quick?[]:R[ri].it.map((_,k)=>({ri,k})))]),[tour,quick]),s=S[cur]||S[0],r=R[s.ri],it=s.k<0?null:r.it[s.k],on=ph==='tour';
const go=i=>setCur(Math.max(0,Math.min(S.length-1,i))),next=()=>cur<S.length-1?go(cur+1):setPh('pick');
const begin=x=>{setRole(x);setCur(0);setPh('tour')};
return<>
<Museum target={on?camFor(s,R):null} intro={!on} active={on?s:null}/>
<div className={'intro'+(ph==='intro'?'':' out')}>
<i className="blob b1"/><i className="blob b2"/><i className="blob b3"/>
<p className="kick">C.g Conference 2027 · Online · 21–23 January</p>
<h1>{'Use of AI in Education'.split(' ').map((w,i)=><span key={i} style={{'--i':i}}>{w}</span>)}</h1>
<p className="sub">Step inside a museum of ideas. Four themes, seven goals, three days, one guided walk.</p>
<div className="chips"><span className="glass">12:00 GMT</span><span className="glass">Keynotes + Panels</span><span className="glass">7 Prizes</span></div>
<button className="cta" onClick={()=>setPh('pick')}>Begin the tour</button><div className="scroll"><i/></div></div>
{ph==='pick'&&<div className="modal"><div className="glass pick"><h2>Who’s visiting today?</h2><p>Your route skips straight to what matters.</p>
{ROLES.map(([k,t,d],i)=><button key={k} style={{'--i':i}} onClick={()=>begin(k)}><b>{t}</b><small>{d}</small></button>)}
<label><input type="checkbox" checked={quick} onChange={e=>setQuick(e.target.checked)}/> Quick tour (one stop per room)</label></div></div>}
{on&&<>
<div className="top glass"><b>C.g 2027</b><span className="bar"><i style={{width:(cur+1)/S.length*100+'%'}}/></span><button onClick={()=>setPh('pick')}>Tour</button></div>
<div className={'slot '+SLOT[cur%6]} key={cur}><div className={'card glass'+(it?'':' big')}>
<p className="eye">{it?`Exhibit ${s.k+1} of ${r.it.length} · `:`Room ${tour.indexOf(s.ri)+1} of ${tour.length} · `}{r.n}</p>
<h2>{it?it[0]:r.n}</h2><p className="txt">{it?body(it):r.ov}</p>
{r.id==='exit'&&!it&&<div className="acts">{(ORD[role]||[0,1,2,3]).map((c,n)=><a key={c} className={n?'':'pri'} href={mail(CTA[c][1])}>{CTA[c][0]}</a>)}</div>}</div></div>
<div className="dock glass"><button onClick={()=>go(cur-1)} disabled={!cur}>‹</button>
<span className="dots">{tour.map(ri=><i key={ri} title={R[ri].n} className={ri===s.ri?'on':''} onClick={()=>go(S.findIndex(x=>x.ri===ri&&x.k<0))}/>)}</span>
<button className="pri" onClick={next}>{cur===S.length-1?'Restart':'Next ›'}</button></div></>}
</>}
