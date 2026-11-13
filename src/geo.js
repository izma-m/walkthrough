export const RING=14,EYE=1.65,NR=9;
export const ang=ri=>ri/NR*Math.PI*2;
export const pol=(a,r,y=0)=>[Math.sin(a)*r,y,-Math.cos(a)*r];
export const itemAng=(ri,j,n)=>ang(ri)+(j-(n-1)/2)*1.3/RING;
export function camFor(s,R){const a=ang(s.ri);if(s.k<0)return{p:pol(a,RING-7.5,EYE),l:pol(a,RING,1.4)};
const t=itemAng(s.ri,s.k,R[s.ri].it.length);return{p:pol(t+.06,RING-3.3,EYE),l:pol(t,RING,1.3)}}
