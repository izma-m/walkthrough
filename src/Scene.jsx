import {useRef} from 'react';import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,MeshReflectorMaterial,Sparkles,Float,Text,Lightformer} from '@react-three/drei';import * as THREE from 'three';
import {R} from './data';import {RING,ang,pol,itemAng} from './geo';
const NAVY='#1d376e',CYAN='#7bb5e4',CREAM='#faf9f7',DEEP='#0b1630',PI=Math.PI;
const FONT='https://cdn.jsdelivr.net/fontsource/fonts/inter@5.0.8/latin-800-normal.woff';
const SH=[<icosahedronGeometry args={[.2]}/>,<torusKnotGeometry args={[.14,.045,96,12]}/>,<octahedronGeometry args={[.22]}/>,<sphereGeometry args={[.2,32,16]}/>,<dodecahedronGeometry args={[.2]}/>,<torusGeometry args={[.15,.06,16,40]}/>];
const spokes=(n,r,len,w,y,rx,c)=>Array.from({length:n},(_,i)=><group key={i} rotation-y={PI-i/n*2*PI}><mesh position={[0,y,r]} rotation-x={rx}><planeGeometry args={[w,len]}/><meshBasicMaterial color={c} toneMapped={false} side={2}/></mesh></group>);
function Item({pos,i,on}){const m=useRef();
useFrame((_,dt)=>{m.current.rotation.y+=dt*.7;const M=m.current.material;M.emissiveIntensity+=((on?1.6:.25)-M.emissiveIntensity)*Math.min(1,dt*4)});
return<group position={pos}>
<mesh position-y={.5}><cylinderGeometry args={[.3,.34,1,32]}/><meshStandardMaterial color={CREAM} roughness={.25}/></mesh>
<mesh position-y={1.9}><cylinderGeometry args={[.42,.42,2.1,32,1,true]}/><meshStandardMaterial color="#fff" transparent opacity={.1} roughness={0} side={2} depthWrite={false}/></mesh>
<mesh position-y={3}><torusGeometry args={[.42,.02,8,48]}/><meshBasicMaterial color={CYAN} toneMapped={false}/></mesh>
<Float speed={2} floatIntensity={.3}><mesh ref={m} position-y={1.5}>{SH[i%6]}<meshStandardMaterial color={CYAN} metalness={.4} roughness={.2} emissive={CYAN} emissiveIntensity={.25}/></mesh></Float></group>}
function Room({r,ri,on,k}){const a=ang(ri),n=r.it.length;
return<group>
<Text position={pol(a,21.6,3.3)} rotation-y={-a} font={FONT} fontSize={1.1} maxWidth={9} textAlign="center" color={NAVY} anchorX="center">{r.n.toUpperCase()}</Text>
<mesh position={pol(a,RING,.012)} rotation-x={-PI/2}><ringGeometry args={[3.9,4,64]}/><meshBasicMaterial color={on?CYAN:NAVY} toneMapped={false}/></mesh>
{r.it.map((_,j)=><Item key={j} pos={pol(itemAng(ri,j,n),RING)} i={j+ri} on={on&&k===j}/>)}</group>}
function Glow({active}){const l=useRef();
useFrame((_,dt)=>{if(!active)return;const r=R[active.ri],a=active.k<0?ang(active.ri):itemAng(active.ri,active.k,r.it.length);l.current.position.lerp(new THREE.Vector3(...pol(a,RING-.4,3.6)),Math.min(1,dt*3))});
return<pointLight ref={l} color={CYAN} intensity={35} distance={10} decay={2} position={[0,3.6,0]}/>}
function Rig({target,intro}){const v=useRef(new THREE.Vector3(0,9,22)),l=useRef(new THREE.Vector3(0,2.5,0));
useFrame(({camera,clock,pointer},dt)=>{let p,q;if(intro||!target){const t=clock.elapsedTime*.12;p=[Math.sin(t)*22,8,Math.cos(t)*22];q=[0,2.5,0]}else{p=target.p;q=target.l}
const k=1-Math.exp(-dt*(intro?2:1.5));v.current.lerp(new THREE.Vector3(...p),k);l.current.lerp(new THREE.Vector3(...q),k);
camera.position.set(v.current.x+pointer.x*.3,v.current.y+pointer.y*.15,v.current.z);camera.lookAt(l.current)});return null}
function Center(){return<group>
<mesh position-y={1.3}><cylinderGeometry args={[.6,1.3,2.6,48]}/><meshStandardMaterial color={CREAM} roughness={.2}/></mesh>
<mesh position-y={2.7}><cylinderGeometry args={[3.4,3.4,.22,96]}/><meshStandardMaterial color="#fff" roughness={.15}/></mesh>
<mesh position-y={2.58} rotation-x={PI/2}><torusGeometry args={[3.1,.04,8,96]}/><meshBasicMaterial color={CYAN} toneMapped={false}/></mesh>
<Float speed={1.5} floatIntensity={.5}><group position-y={4.4}>
<mesh><sphereGeometry args={[1,64,32]}/><meshStandardMaterial color={CYAN} emissive={NAVY} emissiveIntensity={.8} roughness={.15} metalness={.3}/></mesh>
<mesh rotation-y={0}><sphereGeometry args={[1.08,24,16]}/><meshBasicMaterial color="#fff" wireframe transparent opacity={.35}/></mesh></group></Float>
<Sparkles count={160} scale={[16,5,16]} position-y={3} size={3} speed={.4} color={CYAN}/>
<mesh position-y={.013} rotation-x={-PI/2}><ringGeometry args={[3.7,4.9,96]}/><meshBasicMaterial color={NAVY}/></mesh></group>}
export default function Museum({target,intro,active}){
return<Canvas dpr={[1,2]} camera={{fov:55,near:.1,far:120,position:[0,9,22]}}>
<color attach="background" args={[DEEP]}/><fog attach="fog" args={[DEEP,28,64]}/>
<ambientLight intensity={.8}/><directionalLight position={[6,10,4]} intensity={1}/>
<Environment resolution={256}><Lightformer form="rect" intensity={4} position={[0,6,0]} rotation-x={PI/2} scale={[20,20,1]}/><Lightformer form="rect" intensity={2} position={[-10,3,0]} rotation-y={PI/2} scale={[10,5,1]}/></Environment>
<mesh rotation-x={-PI/2}><circleGeometry args={[22,96]}/><MeshReflectorMaterial blur={[300,100]} resolution={512} mixBlur={1} mixStrength={25} roughness={.6} depthScale={1.2} minDepthThreshold={.4} maxDepthThreshold={1.4} color="#ece9e4" metalness={.2} mirror={0}/></mesh>
{spokes(12,12.5,14,.1,.012,-PI/2,NAVY)}
<mesh position-y={6} rotation-x={PI/2}><circleGeometry args={[22,96]}/><meshStandardMaterial color={DEEP} metalness={.8} roughness={.12}/></mesh>
{spokes(14,12,15,.26,5.94,PI/2,'#ffffff')}
<mesh position-y={3}><cylinderGeometry args={[22,22,6,96,1,true]}/><meshStandardMaterial color={CREAM} roughness={.85} side={1}/></mesh>
<mesh position-y={.1} rotation-x={PI/2}><torusGeometry args={[21.9,.05,8,128]}/><meshBasicMaterial color={CYAN} toneMapped={false}/></mesh>
<Center/>{R.map((r,ri)=><Room key={r.id} r={r} ri={ri} on={!!active&&active.ri===ri} k={active?active.k:-1}/>)}
<Glow active={active}/><Rig target={target} intro={intro}/></Canvas>}
