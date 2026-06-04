import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DARK={bg:"#000000",sb:"#1C1C1E",card:"#2C2C2E",bdr:"rgba(255,255,255,0.12)",accent:"#FFFFFF",txt:"#FFFFFF",sub:"#8E8E93",red:"#FF453A",green:"#30D158",orange:"#FF9F0A",blue:"#0A84FF",pink:"#FF375F",ib:"rgba(255,255,255,0.06)",btnTxt:"#000000",shadow:"none",cardBorder:"1px solid rgba(255,255,255,0.1)"};
const LIGHT={bg:"#F2F2F7",sb:"#FFFFFF",card:"#FFFFFF",bdr:"rgba(60,60,67,0.12)",accent:"#000000",txt:"#000000",sub:"#8E8E93",red:"#FF3B30",green:"#34C759",orange:"#FF9500",blue:"#007AFF",pink:"#FF2D55",ib:"rgba(0,0,0,0.04)",btnTxt:"#FFFFFF",shadow:"0 1px 8px rgba(0,0,0,0.07)",cardBorder:"none"};

// ── i18n ──────────────────────────────────────────────────────────
const FA={
  dashboard:"داشبورد",menu:"منو",settings:"تنظیمات",
  training:"تمرین",program:"برنامه",diet:"رژیم",health:"سلامت",
  history:"تاریخچه",finance:"مالی",calendar:"تقویم",
  workShifts:"شیفت کاری",vault:"خزانه",files:"فایل‌ها",todo:"لیست کارها",
  save:"ذخیره",cancel:"لغو",add:"افزودن",delete:"حذف",edit:"ویرایش",
  search:"جستجو",note:"یادداشت",date:"تاریخ",time:"ساعت",
  startWorkout:"شروع تمرین",saveWorkout:"ذخیره تمرین",cancelWorkout:"لغو تمرین",
  exercise:"حرکت",sets:"ست",reps:"تکرار",weight:"وزن",
  circuit:"سیرکویت",emom:"ایموم",restTimer:"تایمر استراحت",
  income:"درآمد",expense:"هزینه",transfer:"انتقال",report:"گزارش",
  sources:"منابع",transactions:"تراکنش‌ها",subscriptions:"اشتراک‌ها",
  debts:"بدهی‌ها",goals:"اهداف",overview:"نمای کلی",
  measurements:"اندازه‌گیری",lastEntries:"۵ مورد آخر",
  addEvent:"افزودن رویداد",addShift:"افزودن شیفت",
  pending:"در انتظار",done:"انجام شد",all:"همه",
  noData:"داده‌ای وجود ندارد",loading:"در حال بارگذاری",
  darkMode:"حالت تیره",lightMode:"حالت روشن",
  language:"زبان",persian:"فارسی",english:"English",
  profile:"پروفایل",name:"نام",age:"سن",height:"قد",
  exportData:"صادر کردن داده",importData:"وارد کردن داده",
  addNew:"+ افزودن",upload:"آپلود",download:"دانلود",
  from:"از",to:"تا",balance:"موجودی",bank:"بانک",
};
const EN={
  dashboard:"Dashboard",menu:"Menu",settings:"Settings",
  training:"Training",program:"Program",diet:"Diet",health:"Health",
  history:"History",finance:"Finance",calendar:"Calendar",
  workShifts:"Work Shifts",vault:"Vault",files:"Files",todo:"To-Do",
  save:"Save",cancel:"Cancel",add:"Add",delete:"Delete",edit:"Edit",
  search:"Search",note:"Note",date:"Date",time:"Time",
  startWorkout:"Start Workout",saveWorkout:"Save Workout",cancelWorkout:"Cancel Workout",
  exercise:"Exercise",sets:"Sets",reps:"Reps",weight:"Weight",
  circuit:"Circuit",emom:"EMOM",restTimer:"Rest Timer",
  income:"Income",expense:"Expense",transfer:"Transfer",report:"Report",
  sources:"Sources",transactions:"Transactions",subscriptions:"Subscriptions",
  debts:"Debts",goals:"Goals",overview:"Overview",
  measurements:"Measurements",lastEntries:"Last 5 Entries",
  addEvent:"Add Event",addShift:"Add Shift",
  pending:"Pending",done:"Done",all:"All",
  noData:"No data yet",loading:"Loading",
  darkMode:"Dark Mode",lightMode:"Light Mode",
  language:"Language",persian:"فارسی",english:"English",
  profile:"Profile",name:"Name",age:"Age",height:"Height",
  exportData:"Export Data",importData:"Import Data",
  addNew:"+ Add New",upload:"Upload",download:"Download",
  from:"From",to:"To",balance:"Balance",bank:"Bank",
};
function t(lang,key){return (lang==="fa"?FA:EN)[key]||key;}


const EXDB=[
  {id:"pu",name:"Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Chest"},
  {id:"wpu",name:"Wide Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Chest"},
  {id:"dpu",name:"Diamond Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Triceps"},
  {id:"plu",name:"Pull-ups",cat:"Upper",typ:"Calisthenics",mu:"Back"},
  {id:"chu",name:"Chin-ups",cat:"Upper",typ:"Calisthenics",mu:"Biceps"},
  {id:"mu",name:"Muscle-ups",cat:"Upper",typ:"Calisthenics",mu:"Back"},
  {id:"dip",name:"Dips",cat:"Upper",typ:"Calisthenics",mu:"Chest"},
  {id:"hsp",name:"Handstand Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Shoulders"},
  {id:"aur",name:"Australian Rows",cat:"Upper",typ:"Calisthenics",mu:"Back"},
  {id:"lsi",name:"L-sit",cat:"Upper",typ:"Calisthenics",mu:"Core"},
  {id:"ppi",name:"Pike Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Shoulders"},
  {id:"apu",name:"Archer Push-ups",cat:"Upper",typ:"Calisthenics",mu:"Chest"},
  {id:"bsq",name:"Bodyweight Squat",cat:"Lower",typ:"Calisthenics",mu:"Quads"},
  {id:"pis",name:"Pistol Squat",cat:"Lower",typ:"Calisthenics",mu:"Quads"},
  {id:"lun",name:"Lunges",cat:"Lower",typ:"Calisthenics",mu:"Quads"},
  {id:"gbl",name:"Glute Bridge",cat:"Lower",typ:"Calisthenics",mu:"Glutes"},
  {id:"nor",name:"Nordic Curl",cat:"Lower",typ:"Calisthenics",mu:"Hamstrings"},
  {id:"cal",name:"Calf Raises",cat:"Lower",typ:"Calisthenics",mu:"Calves"},
  {id:"jsq",name:"Jump Squats",cat:"Lower",typ:"Calisthenics",mu:"Quads"},
  {id:"bpr",name:"Bench Press",cat:"Upper",typ:"Lifting",mu:"Chest"},
  {id:"ibp",name:"Incline Bench Press",cat:"Upper",typ:"Lifting",mu:"Chest"},
  {id:"ohp",name:"Overhead Press",cat:"Upper",typ:"Lifting",mu:"Shoulders"},
  {id:"dbr",name:"Dumbbell Row",cat:"Upper",typ:"Lifting",mu:"Back"},
  {id:"bbr",name:"Barbell Row",cat:"Upper",typ:"Lifting",mu:"Back"},
  {id:"lpd",name:"Lat Pulldown",cat:"Upper",typ:"Lifting",mu:"Back"},
  {id:"bcu",name:"Bicep Curl",cat:"Upper",typ:"Lifting",mu:"Biceps"},
  {id:"hcu",name:"Hammer Curl",cat:"Upper",typ:"Lifting",mu:"Biceps"},
  {id:"tre",name:"Tricep Extension",cat:"Upper",typ:"Lifting",mu:"Triceps"},
  {id:"lra",name:"Lateral Raise",cat:"Upper",typ:"Lifting",mu:"Shoulders"},
  {id:"cfl",name:"Cable Fly",cat:"Upper",typ:"Lifting",mu:"Chest"},
  {id:"bbq",name:"Barbell Squat",cat:"Lower",typ:"Lifting",mu:"Quads"},
  {id:"ddl",name:"Deadlift",cat:"Lower",typ:"Lifting",mu:"Back"},
  {id:"rdl",name:"Romanian Deadlift",cat:"Lower",typ:"Lifting",mu:"Hamstrings"},
  {id:"lgp",name:"Leg Press",cat:"Lower",typ:"Lifting",mu:"Quads"},
  {id:"hth",name:"Hip Thrust",cat:"Lower",typ:"Lifting",mu:"Glutes"},
  {id:"run",name:"Running",cat:"Endurance",typ:"Cardio",mu:"Cardio"},
  {id:"jrp",name:"Jump Rope",cat:"Endurance",typ:"Cardio",mu:"Cardio"},
  {id:"bur",name:"Burpees",cat:"Endurance",typ:"Cardio",mu:"Cardio"},
  {id:"mtc",name:"Mountain Climbers",cat:"Endurance",typ:"Cardio",mu:"Core"},
  {id:"bxj",name:"Box Jumps",cat:"Endurance",typ:"Cardio",mu:"Quads"},
];

const MEALS=["Breakfast","Lunch","Dinner","Snack 1","Snack 2","Drink"];
const BTC={normal:"#C9A84C",superset:"#5A8CD4",giantset:"#C45A8A",amrap:"#D4884C"};
const ACT=[{v:"sedentary",l:"Sedentary",m:1.2},{v:"light",l:"Light (1-3/wk)",m:1.375},{v:"moderate",l:"Moderate (3-5/wk)",m:1.55},{v:"very",l:"Very Active (6-7/wk)",m:1.725},{v:"extreme",l:"Extreme (2x/day)",m:1.9}];
const FCATS={income:["Salary","PT Session","Freelance","Investment","Gift","Other"],expense:["Groceries","Restaurant","Gym & Sport","Transport","Rent & Bills","Clothing","Healthcare","Entertainment","Supplements","Equipment","Subscription","Other"]};
const MUSCLES=["Chest","Back","Shoulders","Biceps","Triceps","Core","Quads","Hamstrings","Glutes","Calves","Cardio"];
const SRC_COLORS=["#C9A84C","#5A8CD4","#C45A8A","#D4884C","#8A5AC4","#5EA87A","#D4C44C"];

function today(){return new Date().toISOString().slice(0,10);}
function fmtDate(d){try{return new Date(d+"T12:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"});}catch(e){return d;}}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2);}
function calcNut(p){
  const W=parseFloat(p.weight)||75,H=parseFloat(p.height)||175,A=parseInt(p.age)||24;
  const G=p.gender||"male";
  const act=ACT.find(a=>a.v===(p.activity||"moderate"))||ACT[2];
  const bmr=G==="male"?10*W+6.25*H-5*A+5:10*W+6.25*H-5*A-161;
  const tdee=Math.round(bmr*act.m);
  const prot=Math.round(W*2.2);
  const fat=Math.round(tdee*0.25/9);
  const carb=Math.round((tdee-prot*4-fat*9)/4);
  return{tdee,prot,fat,carb};
}
function calc1RM(w,r){return Math.round(w*(1+r/30));}

function useLs(key,init){
  const[v,sv]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):init;}catch{return init;}});
  useEffect(()=>{localStorage.setItem(key,JSON.stringify(v));},[key,v]);
  return[v,sv];
}
function useMob(){
  const[m,sm]=useState(window.innerWidth<768);
  useEffect(()=>{const h=()=>sm(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return m;
}
function mkS(T){
  return{
    card:{background:T.card,border:T.cardBorder||"1px solid "+T.bdr,borderRadius:20,padding:18,boxShadow:T.shadow||"none"},
    inp:{background:T.ib,border:"1px solid "+T.bdr,borderRadius:12,color:T.txt,padding:"10px 14px",fontSize:13,outline:"none",fontFamily:"inherit",width:"100%"},
    btn:{background:T.accent,color:T.btnTxt,border:"none",borderRadius:12,padding:"11px 22px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"},
    sm:{background:"transparent",color:T.sub,border:"1px solid "+T.bdr,borderRadius:10,padding:"7px 14px",fontSize:12,cursor:"pointer",fontFamily:"inherit"},
  };
}

function fmtSecs(secs){const mm=Math.floor(secs/60);const ss=secs%60;return mm>0?mm+"m "+ss+"s":ss+"s";}
function nowHHMM(){const n=new Date();return(n.getHours()<10?"0":"")+n.getHours()+":"+(n.getMinutes()<10?"0":"")+n.getMinutes();}
function calcDurMins(st,et){if(!st||!et)return 0;const[sh,sm]=st.split(":").map(Number);const[eh,em]=et.split(":").map(Number);const d=(eh*60+em)-(sh*60+sm);return d>=0?d:d+1440;}

function AmrapTimer({T,S,onClose,onSaveSessions}){
  const[running,setRunning]=useState(false);
  const[elapsed,setElapsed]=useState(0);
  const[inp,setInp]=useState("30");
  const[bSec,setBSec]=useState(30);
  const[sessions,setSessions]=useState([]);
  const ref=useRef(null);
  const elRef=useRef(0);
  function beep(){try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();o.connect(ctx.destination);o.frequency.value=880;o.start();o.stop(ctx.currentTime+0.15);}catch(e){}}
  useEffect(()=>{
    if(running){ref.current=setInterval(()=>{setElapsed(e=>{const ne=e+1;elRef.current=ne;if(ne>0&&ne%bSec===0)beep();return ne;});},1000);}
    else clearInterval(ref.current);
    return()=>clearInterval(ref.current);
  },[running,bSec]);
  function start(){setBSec(parseInt(inp)||30);setElapsed(0);elRef.current=0;setRunning(true);}
  function stopAndLog(){
    setRunning(false);
    const el=elRef.current;
    if(el>0){
      setSessions(prev=>[...prev,{duration:el,beepEvery:parseInt(inp)||30,time:nowHHMM()}]);
      setElapsed(0);elRef.current=0;
    }
  }
  function handleClose(){
    if(running)stopAndLog();
    if(onSaveSessions)onSaveSessions(sessions.length>0?sessions:(elRef.current>0?[{duration:elRef.current,beepEvery:parseInt(inp)||30,time:nowHHMM()}]:[]));
    onClose();
  }
  const m=Math.floor(elapsed/60);const s=elapsed%60;
  const ts=(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
      <div style={{...S.card,width:320,textAlign:"center",padding:28,border:"1px solid "+T.accent+"55",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{fontSize:12,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:2}}>AMRAP TIMER</div>
        <div style={{fontSize:76,fontWeight:800,color:T.txt,fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:16}}>{ts}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:18}}>
          <span style={{fontSize:13,color:T.sub}}>Beep every</span>
          <input value={inp} onChange={e=>setInp(e.target.value)} style={{...S.inp,width:52,textAlign:"center",padding:"6px 8px"}} disabled={running}/>
          <span style={{fontSize:13,color:T.sub}}>sec</span>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:sessions.length>0?16:0}}>
          {running
            ?<button onClick={stopAndLog} style={{...S.btn,background:T.red,color:"#fff"}}>Stop & Log</button>
            :<button onClick={start} style={S.btn}>Start</button>
          }
          <button onClick={()=>{setRunning(false);setElapsed(0);elRef.current=0;}} style={S.sm}>Reset</button>
          <button onClick={handleClose} style={S.sm}>Close</button>
        </div>
        {sessions.length>0&&(
          <div style={{background:T.ib,borderRadius:12,padding:12,textAlign:"left",marginTop:4}}>
            <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:8}}>LOGGED — {sessions.length} SET{sessions.length>1?"S":""}</div>
            {sessions.map((s,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid "+T.bdr,fontSize:11}}>
                <span style={{color:T.txt}}>Set {i+1} · {s.time}</span>
                <span style={{color:T.accent,fontWeight:700}}>{fmtSecs(s.duration)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RestTimer({T,S,onClose}){
  const[inp,setInp]=useState("60");
  const[remaining,setRemaining]=useState(60);
  const[total,setTotal]=useState(60);
  const[running,setRunning]=useState(false);
  const[done,setDone]=useState(false);
  const ref=useRef(null);
  function beep(freq,dur){try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();o.connect(ctx.destination);o.frequency.value=freq;o.start();o.stop(ctx.currentTime+(dur||0.15));}catch(e){}}
  useEffect(()=>{
    if(running){
      ref.current=setInterval(()=>{
        setRemaining(r=>{
          if(r<=1){setRunning(false);setDone(true);beep(660,0.4);return 0;}
          if(r===4||r===3||r===2)beep(880,0.1);
          return r-1;
        });
      },1000);
    }else clearInterval(ref.current);
    return()=>clearInterval(ref.current);
  },[running]);
  function start(){const t=parseInt(inp)||60;setTotal(t);setRemaining(t);setDone(false);setRunning(true);}
  function reset(){setRunning(false);setDone(false);const t=parseInt(inp)||60;setTotal(t);setRemaining(t);}
  const m=Math.floor(remaining/60);const s=remaining%60;
  const ts=(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  const r2=55;const circ=2*Math.PI*r2;
  const dashOff=circ*(1-(total>0?remaining/total:0));
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
      <div style={{...S.card,width:300,textAlign:"center",padding:28,border:"1px solid "+T.blue+"55"}}>
        <div style={{fontSize:12,fontWeight:700,color:T.blue,marginBottom:16,letterSpacing:2}}>REST TIMER</div>
        <div style={{position:"relative",width:150,height:150,margin:"0 auto 18px"}}>
          <svg width="150" height="150" style={{transform:"rotate(-90deg)"}}>
            <circle cx="75" cy="75" r={r2} fill="none" stroke={T.ib} strokeWidth="9"/>
            <circle cx="75" cy="75" r={r2} fill="none" stroke={done?T.green:T.blue} strokeWidth="9" strokeDasharray={circ} strokeDashoffset={dashOff} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.95s linear,stroke 0.3s"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{fontSize:done?18:34,fontWeight:800,color:done?T.green:T.txt,fontVariantNumeric:"tabular-nums"}}>{done?"Done!":ts}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:18}}>
          <span style={{fontSize:13,color:T.sub}}>Duration</span>
          <input value={inp} onChange={e=>setInp(e.target.value)} style={{...S.inp,width:60,textAlign:"center",padding:"6px 8px"}} disabled={running}/>
          <span style={{fontSize:13,color:T.sub}}>sec</span>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          {!running?<button onClick={start} style={{...S.btn,background:T.blue,color:"#fff"}}>Start</button>:<button onClick={()=>setRunning(false)} style={S.sm}>Pause</button>}
          <button onClick={reset} style={S.sm}>Reset</button>
          <button onClick={onClose} style={S.sm}>Close</button>
        </div>
      </div>
    </div>
  );
}

function DashTab({T,S,mob,profile,wLogs,sources,txns,subs,debts,goals,hLog,diets,calEv}){
  const now=new Date();
  const tod=today();
  const tom=new Date(Date.now()+86400000).toISOString().slice(0,10);
  const latestW=[...hLog].filter(l=>l.weight).sort((a,b)=>b.date.localeCompare(a.date))[0];
  const wt=latestW?parseFloat(latestW.weight):(parseFloat(profile.weight)||75);
  const H=parseFloat(profile.height)||175;
  const bmiV=wt/((H/100)*(H/100));
  const weekAgo=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
  const weekW=wLogs.filter(l=>l.date>=weekAgo&&(l.exercises||[]).length>0).length;
  const weekDays=[];
  for(let i=6;i>=0;i--){
    const d=new Date(Date.now()-i*86400000);
    const ds=d.toISOString().slice(0,10);
    const log=wLogs.find(l=>l.date===ds);
    weekDays.push({day:d.toLocaleDateString("en-GB",{weekday:"short"}),v:(log&&log.exercises)?log.exercises.length:0});
  }
  const todLog=wLogs.find(l=>l.date===tod);
  const urgSubs=subs.filter(s=>{const d=s.dayOfMonth-now.getDate();return d>=0&&d<=2;});
  const totBal=sources.reduce((s,x)=>s+x.balance,0);
  const activeDebts=debts.filter(d=>!d.settled);
  const nut=calcNut(profile);
  const todDiet=diets.filter(d=>d.date===tod);
  const totCal=Math.round(todDiet.reduce((a,d)=>a+(d.cal||0),0));
  const totPro=Math.round(todDiet.reduce((a,d)=>a+(d.p||0),0));
  const todEvs=calEv.filter(e=>e.date===tod&&!e.cancelled);
  const tomEvs=calEv.filter(e=>e.date===tom&&!e.cancelled);
  const greetHr=now.getHours();
  const greet=greetHr<12?"Good morning":greetHr<17?"Good afternoon":"Good evening";
  return(
    <div style={{padding:mob?16:28,paddingBottom:100,maxWidth:600,margin:"0 auto"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:13,color:T.sub,marginBottom:4}}>{now.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{fontSize:26,fontWeight:800,color:T.txt}}>{greet}{profile.name?", "+profile.name:""}!</div>
      </div>
      {urgSubs.length>0&&urgSubs.map(s=>{
        const d=s.dayOfMonth-now.getDate();
        return(
          <div key={s.id} style={{background:T.orange+"15",border:"1px solid "+T.orange+"44",borderRadius:12,padding:"10px 14px",marginBottom:8,fontSize:12,color:T.txt}}>
            Subscription: <strong>{s.name}</strong> GBP {s.amount} due {d===0?"today!":d===1?"tomorrow":"in 2 days"}
          </div>
        );
      })}
      <div style={{fontSize:11,fontWeight:700,color:T.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Stat Cards</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
        <div style={{background:"linear-gradient(145deg,"+T.card+","+T.accent+"1A)",border:"1px solid "+T.accent+"33",borderRadius:16,padding:14}}>
          <div style={{fontSize:10,color:T.sub,marginBottom:8,letterSpacing:1}}>WEIGHT</div>
          <div style={{fontSize:22,fontWeight:800,color:T.txt,lineHeight:1}}>{wt.toFixed(1)}</div>
          <div style={{fontSize:10,color:T.sub,marginTop:4}}>kg</div>
        </div>
        <div style={{...S.card,padding:14,textAlign:"left"}}>
          <div style={{fontSize:10,color:T.sub,marginBottom:8,letterSpacing:1}}>BMI</div>
          <div style={{fontSize:22,fontWeight:800,color:T.accent,lineHeight:1}}>{bmiV.toFixed(1)}</div>
          <div style={{fontSize:10,color:bmiV<18.5?T.blue:bmiV<25?T.green:bmiV<30?T.orange:T.red,marginTop:4}}>{bmiV<18.5?"Under":bmiV<25?"Normal":bmiV<30?"Over":"Obese"}</div>
        </div>
        <div style={{...S.card,padding:14,textAlign:"left"}}>
          <div style={{fontSize:10,color:T.sub,marginBottom:8,letterSpacing:1}}>WORKOUTS</div>
          <div style={{fontSize:22,fontWeight:800,color:T.txt,lineHeight:1}}>{weekW}</div>
          <div style={{fontSize:10,color:T.sub,marginTop:4}}>this week</div>
        </div>
      </div>
      <div style={{fontSize:11,fontWeight:700,color:T.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Weekly Progress</div>
      <div style={{...S.card,marginBottom:24,padding:"16px 12px"}}>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weekDays} barSize={22} margin={{top:4,right:4,left:-20,bottom:0}}>
            <XAxis dataKey="day" tick={{fontSize:10,fill:T.sub}} axisLine={false} tickLine={false}/>
            <Bar dataKey="v" fill={T.accent} radius={[5,5,0,0]} name="Exercises">
              {weekDays.map((_,i)=><Cell key={i} fill={_.v>0?T.accent:T.ib}/>)}
            </Bar>
            <Tooltip contentStyle={{background:T.sb,border:"1px solid "+T.bdr,borderRadius:10,fontSize:11}} labelStyle={{color:T.txt}} itemStyle={{color:T.accent}} cursor={{fill:T.accent+"11"}}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {(()=>{
        const wkAgo=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
        const twWkAgo=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
        const regL=wLogs.filter(l=>l.type!=="amrap_single");
        const pm={};
        regL.forEach(log=>{const tw=log.date>=wkAgo;const lw=log.date>=twWkAgo&&log.date<wkAgo;if(!tw&&!lw)return;(log.exercises||[]).forEach(ex=>{if(!pm[ex.name])pm[ex.name]={};const sets=ex.sets||[];const mxW=sets.length?Math.max(0,...sets.map(s=>parseFloat(s.weight)||0)):0;const mxR=sets.length?Math.max(0,...sets.map(s=>parseInt(s.reps)||0)):0;const k=tw?"tw":"lw";if(!pm[ex.name][k]||mxW>(pm[ex.name][k].maxW||0))pm[ex.name][k]={maxW:mxW,maxR:mxR};});});
        const rows=Object.entries(pm).filter(([_,v])=>v.tw&&v.lw).slice(0,5);
        if(rows.length===0)return null;
        return(
          <div style={{...S.card,marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>EXERCISE PROGRESS</div>
            {rows.map(([name,v])=>{
              const useW=((v.tw&&v.tw.maxW)||0)>0||((v.lw&&v.lw.maxW)||0)>0;
              const cur=useW?((v.tw&&v.tw.maxW)||0):((v.tw&&v.tw.maxR)||0);
              const prev=useW?((v.lw&&v.lw.maxW)||0):((v.lw&&v.lw.maxR)||0);
              const diff=cur-prev;
              return(
                <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid "+T.bdr}}>
                  <span style={{fontSize:12,color:T.txt,fontWeight:600}}>{name}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:11,color:T.sub}}>{prev}{useW?"kg":"r"} → {cur}{useW?"kg":"r"}</span>
                    <span style={{fontSize:13,fontWeight:800,color:diff>0?T.green:diff<0?T.red:T.sub}}>{diff>0?"↑+"+diff+(useW?"kg":""):diff<0?"↓"+Math.abs(diff)+(useW?"kg":""):"="}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        <div style={S.card}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>TODAY SESSION</div>
          {todLog&&(todLog.exercises||[]).length>0?(
            <div>{(todLog.exercises||[]).slice(0,3).map((e,i)=>(
              <div key={i} style={{fontSize:12,padding:"4px 0",borderBottom:"1px solid "+T.bdr,color:T.txt,display:"flex",justifyContent:"space-between"}}>
                <span>{e.name}</span><span style={{color:T.sub,fontSize:11}}>{(e.sets||[]).length}s</span>
              </div>
            ))}
            {(todLog.exercises||[]).length>3&&<div style={{fontSize:11,color:T.sub,marginTop:5}}>+{(todLog.exercises||[]).length-3} more</div>}
            </div>
          ):<div style={{fontSize:12,color:T.sub}}>No session today</div>}
        </div>
        <div style={{...S.card,background:"linear-gradient(145deg,"+T.card+","+T.accent+"1A)",border:"1px solid "+T.accent+"33"}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>BALANCE</div>
          <div style={{fontSize:24,fontWeight:800,color:T.txt,lineHeight:1}}>{Math.abs(totBal)<10000?totBal.toFixed(0):totBal.toFixed(0)}</div>
          <div style={{fontSize:11,color:T.sub,marginTop:4}}>GBP · {sources.length} sources</div>
        </div>
      </div>

      {activeDebts.length>0&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>DEBTS</div>
          {activeDebts.slice(0,3).map(d=>(
            <div key={d.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid "+T.bdr,fontSize:12}}>
              <span style={{color:d.type==="owe_me"?T.green:T.red}}>{d.type==="owe_me"?"+ ":"- "}{d.person}</span>
              <span style={{fontWeight:700,color:d.type==="owe_me"?T.green:T.red}}>GBP {parseFloat(d.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
      {(todEvs.length>0||tomEvs.length>0)&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>EVENTS</div>
          {todEvs.map(e=><div key={e.id} style={{fontSize:12,padding:"4px 0",borderBottom:"1px solid "+T.bdr,color:T.txt}}><span style={{color:T.green,fontWeight:700,fontSize:10}}>TODAY </span>{e.title}{e.time?" · "+e.time:""}</div>)}
          {tomEvs.map(e=><div key={e.id} style={{fontSize:12,padding:"4px 0",borderBottom:"1px solid "+T.bdr,color:T.sub}}><span style={{color:T.orange,fontWeight:700,fontSize:10}}>TMR </span>{e.title}</div>)}
        </div>
      )}
      {(()=>{
        const todos=JSON.parse(localStorage.getItem("fl3_todos")||"[]");
        const now=today();
        const d3=new Date();d3.setDate(d3.getDate()+3);
        const max=d3.toISOString().slice(0,10);
        const upcoming=todos.filter(t=>!t.done&&t.date>=now&&t.date<=max).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,6);
        if(upcoming.length===0)return null;
        return(
          <div style={S.card}>
            <div style={{fontSize:11,fontWeight:700,color:"#5856D6",marginBottom:10,letterSpacing:1}}>TO-DO (NEXT 3 DAYS)</div>
            {upcoming.map(t=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid "+T.bdr,fontSize:12}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#5856D6",flexShrink:0}}/>
                <div style={{flex:1,color:T.txt}}>{t.title}</div>
                <div style={{color:T.sub,fontSize:10}}>{t.date===now?"Today":fmtDate(t.date)}{t.time?" · "+t.time:""}</div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}


function AMRAPSingleModal({T,S,mob,onSave,onClose,draft,onSaveDraft}){
  const[phase,setPhase]=useState(()=>(draft && draft.phase)||"setup");
  const[cd,setCd]=useState(5);
  const[selEx,setSelEx]=useState(()=>(draft && draft.selEx)||null);
  const[exSearch,setExSearch]=useState("");
  const[showExPick,setShowExPick]=useState(false);
  const[timeLim,setTimeLim]=useState(()=>(draft && draft.timeLim)||"30");
  const[beepEvery,setBeepEvery]=useState(()=>(draft && draft.beepEvery)||"30");
  const[gTotal,setGTotal]=useState(()=>(draft && draft.gTotal)||"");
  const[gSets,setGSets]=useState(()=>(draft && draft.gSets)||"");
  const[gRPS,setGRPS]=useState(()=>(draft && draft.gRPS)||"");
  const[sets,setSets]=useState(()=>(draft && draft.sets)||[]);
  const[curReps,setCurReps]=useState("");
  const[curWt,setCurWt]=useState("");
  const[secs,setSecs]=useState(()=>(draft && draft.secs)||0);
  const tRef=useRef(null);
  function bk(f,d){try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();o.connect(ctx.destination);o.frequency.value=f||880;o.start();o.stop(ctx.currentTime+(d||0.12));}catch(e){}}
  useEffect(()=>{
    if(phase==="countdown"){
      if(cd>0){bk(660,0.1);const t=setTimeout(()=>setCd(c=>c-1),1000);return()=>clearTimeout(t);}
      else{bk(1100,0.4);setSecs(0);setPhase("active");}
    }
  },[phase,cd]);
  useEffect(()=>{
    if(phase==="active"){tRef.current=setInterval(()=>setSecs(s=>{const ne=s+1;const be=parseInt(beepEvery)||30;if(ne>0&&ne%be===0)bk(880,0.15);return ne;}),1000);}
    else clearInterval(tRef.current);
    return()=>clearInterval(tRef.current);
  },[phase,beepEvery]);
  function startCd(){if(!selEx)return;ensureEmomAudio();setCd(5);setPhase("countdown");}
  function ensureEmomAudio(){try{if(!window._emomCtx)window._emomCtx=new(window.AudioContext||window.webkitAudioContext)();if(window._emomCtx.state==="suspended")window._emomCtx.resume();}catch(e){}}
  function logSet(){const r=parseInt(curReps)||0;if(r<=0)return;const w=curWt===""?0:parseFloat(curWt)||0;setSets(prev=>[...prev,{reps:r,weight:w}]);setCurReps("");setCurWt("");}
  function saveDraft(){onSaveDraft&&onSaveDraft({phase,selEx,timeLim,beepEvery,gTotal,gSets,gRPS,sets,secs});}
  function cancelEmom(){onSaveDraft&&onSaveDraft(null);onClose();}
  function stopSave(){const tr=sets.reduce((s,st)=>s+st.reps,0);onSave({id:uid(),exerciseName:selEx.name,exerciseMu:selEx.mu,timeLimitMins:parseInt(timeLim)||0,beepEvery:parseInt(beepEvery)||30,goalTotal:parseInt(gTotal)||0,goalSets:parseInt(gSets)||0,goalRPS:parseInt(gRPS)||0,duration:Math.round(secs/60),sets,totalSets:sets.length,totalReps:tr});onSaveDraft&&onSaveDraft(null);onClose();}
  const mm=Math.floor(secs/60);const ss=secs%60;
  const ts=(mm<10?"0":"")+mm+":"+(ss<10?"0":"")+ss;
  const totReps=sets.reduce((s,st)=>s+st.reps,0);
  const goalTotalN=parseInt(gTotal)||0;
  const pct=goalTotalN>0?Math.min(100,Math.round(totReps/goalTotalN*100)):0;
  const filtEx=EXDB.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.mu.toLowerCase().includes(exSearch.toLowerCase()));
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:600,overflowY:"auto",padding:"12px 0"}}>
      <div style={{...S.card,width:mob?"96vw":"400px",border:"1px solid "+T.orange+"55",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.orange,letterSpacing:2}}>AMRAP SINGLE</div>
          <button onClick={()=>{saveDraft();onClose();}} style={{...S.sm,padding:"3px 9px",fontSize:11}}>{draft?"Resume later":"Close"}</button>
        </div>
        {phase==="countdown"&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:11,color:T.sub,letterSpacing:2,marginBottom:16}}>GET READY</div>
            <div style={{fontSize:120,fontWeight:900,lineHeight:1,color:cd>0?T.orange:T.green,fontVariantNumeric:"tabular-nums"}}>{cd>0?cd:"GO!"}</div>
            <div style={{fontSize:13,color:T.sub,marginTop:16}}>{selEx.name}</div>
          </div>
        )}
        {phase==="setup"&&(
          <div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:9,color:T.sub,marginBottom:5,letterSpacing:1}}>EXERCISE</div>
              <button onClick={()=>setShowExPick(true)} style={{...S.inp,textAlign:"left",cursor:"pointer",display:"block",color:selEx?T.txt:T.sub}}>{selEx?selEx.name:"Tap to choose exercise..."}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div>
                <div style={{fontSize:9,color:T.sub,marginBottom:5,letterSpacing:1}}>TIME LIMIT (MIN)</div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <input value={timeLim} onChange={e=>setTimeLim(e.target.value)} style={{...S.inp,flex:1}} placeholder="30" type="number"/>
                  <span style={{color:T.sub,fontSize:10}}>min</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:9,color:T.sub,marginBottom:5,letterSpacing:1}}>BEEP EVERY (SEC)</div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <input value={beepEvery} onChange={e=>setBeepEvery(e.target.value)} style={{...S.inp,flex:1}} placeholder="30" type="number"/>
                  <span style={{color:T.sub,fontSize:10}}>sec</span>
                </div>
              </div>
            </div>
            <div style={{background:T.ib,borderRadius:12,padding:12,marginBottom:14}}>
              <div style={{fontSize:9,color:T.accent,fontWeight:700,letterSpacing:1,marginBottom:6}}>GOAL (OPTIONAL)</div>
              <div style={{fontSize:11,color:T.sub,marginBottom:8}}>e.g. 300 total reps / 15 sets of 20</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                <div><div style={{fontSize:9,color:T.sub,marginBottom:3}}>TOTAL REPS</div><input value={gTotal} onChange={e=>setGTotal(e.target.value)} style={{...S.inp,padding:"7px 6px",textAlign:"center"}} placeholder="300" type="number"/></div>
                <div><div style={{fontSize:9,color:T.sub,marginBottom:3}}>SETS</div><input value={gSets} onChange={e=>setGSets(e.target.value)} style={{...S.inp,padding:"7px 6px",textAlign:"center"}} placeholder="15" type="number"/></div>
                <div><div style={{fontSize:9,color:T.sub,marginBottom:3}}>REPS/SET</div><input value={gRPS} onChange={e=>setGRPS(e.target.value)} style={{...S.inp,padding:"7px 6px",textAlign:"center"}} placeholder="20" type="number"/></div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <button onClick={startCd} disabled={!selEx} style={{...S.btn,flex:1,background:T.orange,opacity:selEx?1:0.4}}>Start Session</button>
              <button onClick={cancelEmom} style={{...S.sm,color:T.red,borderColor:T.red+"44",padding:"9px 14px"}}>Cancel</button>
            </div>
            {showExPick&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:700}}>
                <div style={{...S.card,width:mob?"95vw":"380px",maxHeight:"75vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.orange+"44"}}>
                  <div style={{fontWeight:700,fontSize:14,color:T.orange,marginBottom:10}}>Select Exercise</div>
                  <input value={exSearch} onChange={e=>setExSearch(e.target.value)} style={{...S.inp,marginBottom:8}} placeholder="Search..."/>
                  <div style={{overflowY:"auto",flex:1}}>
                    {filtEx.map(ex=>(
                      <button key={ex.id} onClick={()=>{setSelEx(ex);setShowExPick(false);setExSearch("");}} style={{display:"flex",width:"100%",textAlign:"left",padding:"9px 11px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:9,cursor:"pointer",marginBottom:4,color:T.txt,fontFamily:"inherit"}}>
                        <div><div style={{fontWeight:600,fontSize:13}}>{ex.name}</div><div style={{fontSize:10,color:T.sub}}>{ex.mu}</div></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>setShowExPick(false)} style={{...S.sm,marginTop:8}}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
        {phase==="active"&&(
          <div>
            <div style={{background:T.orange+"15",borderRadius:12,padding:14,marginBottom:10}}>
              <div style={{fontSize:10,color:T.sub,marginBottom:4}}>{selEx.name}{parseInt(timeLim)>0?" · "+timeLim+"min":""}{" · beep/"+beepEvery+"s"}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:goalTotalN>0?10:0}}>
                <div style={{fontSize:38,fontWeight:800,color:T.orange,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{ts}</div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:24,fontWeight:800,color:T.txt}}>{sets.length}<span style={{fontSize:10,color:T.sub}}> sets</span></div>
                  <div style={{fontSize:14,color:T.sub}}>{totReps} reps</div>
                </div>
              </div>
              {goalTotalN>0&&(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:T.sub,marginBottom:3}}><span>Goal: {goalTotalN} reps{parseInt(gSets)>0?" / "+gSets+" sets":""}{parseInt(gRPS)>0?" of "+gRPS:""}</span><span style={{color:pct>=100?T.green:T.orange,fontWeight:700}}>{pct}%</span></div>
                  <div style={{height:5,background:T.ib,borderRadius:3}}><div style={{height:"100%",width:pct+"%",background:pct>=100?T.green:T.orange,borderRadius:3,transition:"width 0.3s"}}/></div>
                </div>
              )}
            </div>
            <div style={{background:T.ib,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:9,fontWeight:700,color:T.orange,letterSpacing:1,marginBottom:8}}>LOG SET {sets.length+1}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><div style={{fontSize:9,color:T.sub,marginBottom:3}}>REPS *</div><input value={curReps} onChange={e=>setCurReps(e.target.value)} style={{...S.inp,fontSize:28,fontWeight:800,textAlign:"center",padding:"10px 6px"}} placeholder={gRPS||"20"} type="number" min="1"/></div>
                <div><div style={{fontSize:9,color:T.sub,marginBottom:3}}>WEIGHT kg (blank = 0)</div><input value={curWt} onChange={e=>setCurWt(e.target.value)} style={{...S.inp,fontSize:18,textAlign:"center",padding:"10px 6px"}} placeholder="0"/></div>
              </div>
              <button onClick={logSet} disabled={!curReps} style={{...S.btn,width:"100%",background:T.orange,color:T.btnTxt,opacity:curReps?1:0.4}}>+ Log Set {sets.length+1}</button>
            </div>
            {sets.length>0&&(
              <div style={{background:T.ib,borderRadius:10,padding:10,marginBottom:10}}>
                <div style={{fontSize:9,color:T.sub,letterSpacing:1,marginBottom:6}}>SETS LOGGED</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(52px,1fr))",gap:4}}>
                  {sets.map((st,i)=>(
                    <div key={i} style={{background:T.card,borderRadius:8,padding:"5px 2px",textAlign:"center"}}>
                      <div style={{fontSize:8,color:T.sub}}>#{i+1}</div>
                      <div style={{fontSize:15,fontWeight:800,color:T.txt}}>{st.reps}</div>
                      <div style={{fontSize:8,color:T.sub}}>{st.weight>0?st.weight+"kg":"BW"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button onClick={stopSave} disabled={sets.length===0} style={{...S.btn,width:"100%",background:T.red,color:"#fff",opacity:sets.length>0?1:0.4}}>Stop & Save to Workout</button>
          </div>
        )}
      </div>
    </div>
  );
}


function CircuitModal({T,S,mob,onSave,onClose,draft,onSaveDraft}){
  const[phase,setPhase]=useState(()=>(draft && draft.phase)||"setup");
  const[cd,setCd]=useState(5);
  const[circuitExs,setCircuitExs]=useState(()=>(draft && draft.circuitExs)||[]);
  const[showExPick,setShowExPick]=useState(false);
  const[exSearch,setExSearch]=useState("");
  const[rounds,setRounds]=useState(()=>(draft && draft.rounds)||"4");
  const[everyMins,setEveryMins]=useState(()=>(draft && draft.everyMins)||"3");
  const[secs,setSecs]=useState(()=>(draft && draft.secs)||0);
  const[dragIdx,setDragIdx]=useState(null);
  const tRef=useRef(null);
  const actxRef=useRef(null);
  function ensureAudio(){if(!actxRef.current){try{actxRef.current=new(window.AudioContext||window.webkitAudioContext)();}catch(e){return;}}if(actxRef.current.state==="suspended")actxRef.current.resume();}
  function bk(f,d){try{ensureAudio();const ctx=actxRef.current;if(!ctx)return;const o=ctx.createOscillator();const g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=f||880;g.gain.setValueAtTime(0.4,ctx.currentTime);o.start();o.stop(ctx.currentTime+(d||0.15));}catch(e){}}
  useEffect(()=>{
    if(phase==="countdown"){
      if(cd>0){bk(660,0.1);const t=setTimeout(()=>setCd(c=>c-1),1000);return()=>clearTimeout(t);}
      else{bk(1100,0.4);setSecs(0);setPhase("active");}
    }
  },[phase,cd]);
  useEffect(()=>{
    if(phase==="active"){tRef.current=setInterval(()=>setSecs(s=>{const ne=s+1;const em=parseInt(everyMins)||0;if(em>0&&ne>0&&ne%(em*60)===0)bk(880,0.2);return ne;}),1000);}
    else clearInterval(tRef.current);
    return()=>clearInterval(tRef.current);
  },[phase,everyMins]);
  function pickEx(ex){setCircuitExs(prev=>[...prev,{id:uid(),ex,reps:"10",weight:""}]);setShowExPick(false);setExSearch("");}
  function updEx(i,f,v){setCircuitExs(prev=>prev.map((c,j)=>j===i?{...c,[f]:v}:c));}
  function rmEx(i){setCircuitExs(prev=>prev.filter((_,j)=>j!==i));}
  function reorder(from,to){if(from===to||from===null)return;const items=[...circuitExs];const[m]=items.splice(from,1);items.splice(to,0,m);setCircuitExs(items);setDragIdx(null);}
  function startCd(){if(circuitExs.length===0)return;ensureAudio();setCd(5);setPhase("countdown");}
  function saveDraft(){onSaveDraft&&onSaveDraft({phase,circuitExs,rounds,everyMins,secs});}
  function cancelCircuit(){onSaveDraft&&onSaveDraft(null);onClose();}
  function stopSave(){
    onSave({id:uid(),exercises:circuitExs.map(c=>({name:c.ex.name,exId:c.ex.id,mu:c.ex.mu,reps:c.reps||"10",weight:c.weight||"BW"})),duration:Math.round(secs/60),rounds:parseInt(rounds)||0,everyMins:parseInt(everyMins)||0});
    onSaveDraft&&onSaveDraft(null);
    onClose();
  }
  const mm=Math.floor(secs/60);const ss=secs%60;
  const ts=(mm<10?"0":"")+mm+":"+(ss<10?"0":"")+ss;
  const filtEx=EXDB.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.mu.toLowerCase().includes(exSearch.toLowerCase()));
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:600,overflowY:"auto",padding:"12px 0"}}>
      <div style={{...S.card,width:mob?"96vw":"420px",border:"1px solid "+T.blue+"55",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.blue,letterSpacing:2}}>CIRCUIT</div>
          <button onClick={()=>{saveDraft();onClose();}} style={{...S.sm,padding:"3px 9px",fontSize:11}}>{draft?"Resume later":"Close"}</button>
        </div>
        {phase==="countdown"&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:11,color:T.sub,letterSpacing:2,marginBottom:16}}>GET READY</div>
            <div style={{fontSize:120,fontWeight:900,lineHeight:1,color:cd>0?T.blue:T.green,fontVariantNumeric:"tabular-nums"}}>{cd>0?cd:"GO!"}</div>
            <div style={{marginTop:20}}>{circuitExs.map((c,i)=><div key={i} style={{fontSize:13,color:T.sub,padding:"2px 0"}}>{i+1}. {c.ex.name} · {c.reps} reps{c.weight?" · "+c.weight:""}</div>)}</div>
          </div>
        )}
        {phase==="setup"&&(
          <div>
            {circuitExs.length===0&&<div style={{textAlign:"center",padding:"14px 0",color:T.sub,fontSize:13}}>Add exercises to your circuit</div>}
            {circuitExs.map((c,i)=>(
              <div key={c.id} draggable onDragStart={()=>setDragIdx(i)} onDragEnd={()=>setDragIdx(null)} onDragOver={e=>{e.preventDefault();}} onDrop={()=>reorder(dragIdx,i)}
                style={{background:T.ib,borderRadius:12,padding:10,marginBottom:7,display:"flex",gap:8,alignItems:"center",opacity:dragIdx===i?0.45:1,cursor:"grab",border:"1px solid "+(dragIdx===i?T.blue+"55":T.bdr)}}>
                <div style={{fontSize:18,color:T.sub,userSelect:"none",flexShrink:0}}>⋮⋮</div>
                <div style={{fontSize:13,fontWeight:800,color:T.blue,width:18,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:T.txt,marginBottom:6}}>{c.ex.name} <span style={{fontSize:10,color:T.sub}}>({c.ex.mu})</span></div>
                  <div style={{display:"flex",gap:6}}>
                    <div style={{flex:1}}><div style={{fontSize:8,color:T.sub,marginBottom:2}}>REPS</div><input value={c.reps} onChange={e=>updEx(i,"reps",e.target.value)} style={{...S.inp,textAlign:"center",fontSize:14,fontWeight:700,padding:"5px 4px"}} type="number" min="1"/></div>
                    <div style={{flex:1}}><div style={{fontSize:8,color:T.sub,marginBottom:2}}>WEIGHT</div><input value={c.weight} onChange={e=>updEx(i,"weight",e.target.value)} style={{...S.inp,textAlign:"center",fontSize:13,padding:"5px 4px"}} placeholder="BW"/></div>
                  </div>
                </div>
                <button onClick={()=>rmEx(i)} style={{...S.sm,color:T.red,padding:"4px 9px",fontSize:12,flexShrink:0}}>x</button>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div><div style={{fontSize:9,color:T.sub,marginBottom:5,letterSpacing:1}}>ROUNDS (0=unlimited)</div><input value={rounds} onChange={e=>setRounds(e.target.value)} style={{...S.inp,textAlign:"center"}} placeholder="4" type="number"/></div>
              <div><div style={{fontSize:9,color:T.sub,marginBottom:5,letterSpacing:1}}>EVERY X MIN (beep)</div><input value={everyMins} onChange={e=>setEveryMins(e.target.value)} style={{...S.inp,textAlign:"center"}} placeholder="3" type="number"/></div>
            </div>
            <button onClick={()=>setShowExPick(true)} style={{...S.sm,width:"100%",marginBottom:10,padding:"11px",fontSize:12,color:T.blue,borderColor:T.blue+"55"}}>+ Add Exercise</button>
            <div style={{display:"flex",gap:8}}>
              <button onClick={startCd} disabled={circuitExs.length===0} style={{...S.btn,flex:1,background:T.blue,opacity:circuitExs.length>0?1:0.4}}>{(draft && draft.phase)==="active"?"Resume Circuit":"Start Circuit"}</button>
              <button onClick={cancelCircuit} style={{...S.sm,color:T.red,borderColor:T.red+"44",padding:"11px 14px"}}>Cancel</button>
            </div>
            {showExPick&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:700}}>
                <div style={{...S.card,width:mob?"95vw":"380px",maxHeight:"75vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.blue+"44"}}>
                  <div style={{fontWeight:700,fontSize:14,color:T.blue,marginBottom:10}}>Select Exercise</div>
                  <input value={exSearch} onChange={e=>setExSearch(e.target.value)} style={{...S.inp,marginBottom:8}} placeholder="Search..."/>
                  <div style={{overflowY:"auto",flex:1}}>
                    {filtEx.map(ex=>(
                      <button key={ex.id} onClick={()=>pickEx(ex)} style={{display:"flex",width:"100%",textAlign:"left",padding:"9px 11px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:9,cursor:"pointer",marginBottom:4,color:T.txt,fontFamily:"inherit"}}>
                        <div><div style={{fontWeight:600,fontSize:13}}>{ex.name}</div><div style={{fontSize:10,color:T.sub}}>{ex.mu}</div></div>
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>setShowExPick(false)} style={{...S.sm,marginTop:8}}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
        {phase==="active"&&(
          <div>
            <div style={{background:T.blue+"15",borderRadius:14,padding:16,marginBottom:12,textAlign:"center"}}>
              <div style={{fontSize:10,color:T.sub,letterSpacing:1,marginBottom:6}}>CIRCUIT RUNNING{parseInt(everyMins)>0?" · beep/"+everyMins+"min":""}{parseInt(rounds)>0?" · "+rounds+" rounds":""}</div>
              <div style={{fontSize:52,fontWeight:900,color:T.blue,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{ts}</div>
            </div>
            {circuitExs.map((c,i)=>(
              <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",background:T.ib,borderRadius:10,marginBottom:5,borderLeft:"3px solid "+T.blue}}>
                <div style={{display:"flex",gap:10}}><span style={{fontSize:13,fontWeight:800,color:T.blue}}>{i+1}</span><div><div style={{fontSize:13,fontWeight:600,color:T.txt}}>{c.ex.name}</div><div style={{fontSize:10,color:T.sub}}>{c.ex.mu}</div></div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:T.txt}}>{c.reps} reps</div>{c.weight&&c.weight!=="BW"&&<div style={{fontSize:11,color:T.sub}}>{c.weight}</div>}</div>
              </div>
            ))}
            <button onClick={stopSave} style={{...S.btn,width:"100%",background:T.red,color:"#fff",padding:"14px",fontSize:15,marginTop:8}}>Stop & Add to Workout</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AMRAPSingle({T,S,mob,wLogs,setWLogs,onBack}){
  const[phase,setPhase]=useState("setup");
  const[selEx,setSelEx]=useState(null);
  const[exSearch,setExSearch]=useState("");
  const[showExPick,setShowExPick]=useState(false);
  const[timeLimitMins,setTimeLimitMins]=useState("30");
  const[sets,setSets]=useState([]);
  const[curReps,setCurReps]=useState("");
  const[curWeight,setCurWeight]=useState("");
  const[sessionSecs,setSessionSecs]=useState(0);
  const[startTime,setStartTime]=useState("");
  const[savedSession,setSavedSession]=useState(null);
  const timerRef=useRef(null);
  useEffect(()=>{
    if(phase==="active"){timerRef.current=setInterval(()=>setSessionSecs(s=>s+1),1000);}
    else clearInterval(timerRef.current);
    return()=>clearInterval(timerRef.current);
  },[phase]);
  const amrapPrevSessions=wLogs.filter(l=>l.type==="amrap_single"&&selEx&&l.exerciseName===selEx.name).sort((a,b)=>b.date.localeCompare(a.date));
  const prevSession=amrapPrevSessions[0]||null;
  function startSession(){if(!selEx)return;setStartTime(nowHHMM());setSets([]);setSessionSecs(0);setPhase("active");}
  function logSet(){const r=parseInt(curReps)||0;if(r<=0)return;setSets(prev=>[...prev,{reps:r,weight:curWeight||"BW"}]);setCurReps("");setCurWeight("");}
  function finish(){
    const et=nowHHMM();
    const totalReps=sets.reduce((s,st)=>s+st.reps,0);
    const session={id:uid(),type:"amrap_single",date:today(),startTime,endTime:et,duration:Math.round(sessionSecs/60),timeLimitMins:parseInt(timeLimitMins)||0,exerciseName:selEx.name,exerciseMu:selEx.mu,sets,totalSets:sets.length,totalReps};
    setWLogs(prev=>[...prev,session]);
    setSavedSession(session);
    setPhase("saved");
  }
  const sm2=Math.floor(sessionSecs/60);const ss2=sessionSecs%60;
  const sessionTs2=(sm2<10?"0":"")+sm2+":"+(ss2<10?"0":"")+ss2;
  const totalReps=sets.reduce((s,st)=>s+st.reps,0);
  const filtered2=EXDB.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.mu.toLowerCase().includes(exSearch.toLowerCase()));
  const dispSets=phase==="saved"?((savedSession&&savedSession.sets)||[]):sets;
  const cmpPrev=phase==="saved"?(amrapPrevSessions[1]||null):prevSession;
  const maxCmp=Math.max(dispSets.length,((cmpPrev&&cmpPrev.sets)||[]).length);

  if(phase==="setup"){return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <button onClick={onBack} style={S.sm}>Back</button>
        <div style={{fontSize:18,fontWeight:800,color:T.txt}}>AMRAP Single Exercise</div>
      </div>
      <div style={{...S.card,marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:10}}>SELECT EXERCISE</div>
        <button onClick={()=>setShowExPick(true)} style={{...S.inp,textAlign:"left",cursor:"pointer",display:"block",color:selEx?T.txt:T.sub}}>
          {selEx?selEx.name:"Tap to choose exercise..."}
        </button>
      </div>
      <div style={{...S.card,marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:10}}>TIME LIMIT (OPTIONAL)</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <input value={timeLimitMins} onChange={e=>setTimeLimitMins(e.target.value)} style={{...S.inp,flex:1}} placeholder="30" type="number"/>
          <span style={{color:T.sub,fontSize:13}}>minutes (0 = unlimited)</span>
        </div>
      </div>
      {prevSession&&selEx&&(
        <div style={{...S.card,marginBottom:14,borderColor:T.accent+"33"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:6}}>LAST SESSION ({fmtDate(prevSession.date)})</div>
          <div style={{fontSize:14,color:T.txt,fontWeight:600}}>{prevSession.totalSets} sets · {prevSession.totalReps} total reps</div>
          <div style={{fontSize:11,color:T.sub,marginTop:3}}>{prevSession.duration}min · {prevSession.startTime} – {prevSession.endTime}</div>
        </div>
      )}
      <button onClick={startSession} disabled={!selEx} style={{...S.btn,width:"100%",padding:"16px",fontSize:16,opacity:selEx?1:0.4}}>Start Session</button>
      {showExPick&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{...S.card,width:mob?"95vw":"420px",maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.accent+"33"}}>
            <div style={{fontWeight:700,fontSize:15,color:T.accent,marginBottom:12}}>Select Exercise</div>
            <input value={exSearch} onChange={e=>setExSearch(e.target.value)} style={{...S.inp,marginBottom:10}} placeholder="Search..."/>
            <div style={{overflowY:"auto",flex:1}}>
              {filtered2.map(ex=>(
                <button key={ex.id} onClick={()=>{setSelEx(ex);setShowExPick(false);setExSearch("");}} style={{display:"flex",width:"100%",textAlign:"left",padding:"10px 12px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:10,cursor:"pointer",marginBottom:5,color:T.txt,fontFamily:"inherit"}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{ex.name}</div><div style={{fontSize:11,color:T.sub}}>{ex.mu}</div></div>
                </button>
              ))}
            </div>
            <button onClick={()=>setShowExPick(false)} style={{...S.sm,marginTop:10}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );}

  if(phase==="active"){return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:100}}>
      <div style={{background:"linear-gradient(135deg,"+T.card+","+T.accent+"18)",border:"1px solid "+T.accent+"55",borderRadius:18,padding:18,marginBottom:14}}>
        <div style={{fontSize:10,color:T.sub,letterSpacing:1,marginBottom:6}}>AMRAP · {selEx.name}{timeLimitMins>0?" · "+timeLimitMins+"min limit":""}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div style={{fontSize:42,fontWeight:800,color:T.accent,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{sessionTs2}</div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:30,fontWeight:800,color:T.txt}}>{sets.length}<span style={{fontSize:12,color:T.sub,fontWeight:400}}> sets</span></div>
            <div style={{fontSize:16,fontWeight:700,color:T.sub}}>{totalReps} reps</div>
          </div>
        </div>
      </div>
      <div style={{...S.card,marginBottom:12}}>
        <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:10}}>LOG SET {sets.length+1}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>REPS *</div><input value={curReps} onChange={e=>setCurReps(e.target.value)} style={{...S.inp,fontSize:24,fontWeight:800,textAlign:"center",padding:"12px 8px"}} placeholder="10" type="number" min="1"/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>WEIGHT (optional)</div><input value={curWeight} onChange={e=>setCurWeight(e.target.value)} style={{...S.inp,fontSize:16,textAlign:"center",padding:"12px 8px"}} placeholder="BW"/></div>
        </div>
        <button onClick={logSet} disabled={!curReps} style={{...S.btn,width:"100%",opacity:curReps?1:0.4}}>+ Log Set {sets.length+1}</button>
      </div>
      {sets.length>0&&(
        <div style={{...S.card,marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:8}}>LOGGED SETS</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(65px,1fr))",gap:6}}>
            {sets.map((st,i)=>{
              const pR=(prevSession&&prevSession.sets&&prevSession.sets[i]&&prevSession.sets[i].reps);
              const diff=pR?st.reps-pR:null;
              return(
                <div key={i} style={{background:T.ib,borderRadius:10,padding:"8px 4px",textAlign:"center",border:"1px solid "+(diff===null?T.bdr:diff>0?T.green+"55":diff<0?T.red+"55":T.bdr)}}>
                  <div style={{fontSize:9,color:T.sub}}>Set {i+1}</div>
                  <div style={{fontSize:18,fontWeight:800,color:T.txt}}>{st.reps}</div>
                  {st.weight&&st.weight!=="BW"&&<div style={{fontSize:9,color:T.sub}}>{st.weight}kg</div>}
                  {diff!==null&&<div style={{fontSize:10,fontWeight:700,color:diff>0?T.green:diff<0?T.red:T.sub}}>{diff>0?"+":""}{diff}</div>}
                </div>
              );
            })}
          </div>
          {prevSession&&<div style={{fontSize:10,color:T.sub,marginTop:8}}>Comparing vs {fmtDate(prevSession.date)}: {prevSession.totalSets}s · {prevSession.totalReps}r</div>}
        </div>
      )}
      <button onClick={finish} disabled={sets.length===0} style={{...S.btn,width:"100%",padding:"14px",fontSize:15,opacity:sets.length>0?1:0.4}}>Finish & Save</button>
    </div>
  );}

  // Saved
  const ds=savedSession||{sets:[],totalSets:0,totalReps:0,duration:0,startTime:"",endTime:""};
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{...S.card,background:"linear-gradient(135deg,"+T.card+","+T.green+"18)",border:"1px solid "+T.green+"44",marginBottom:16,textAlign:"center",padding:24}}>
        <div style={{fontSize:12,fontWeight:700,color:T.green,letterSpacing:1,marginBottom:8}}>SESSION SAVED</div>
        <div style={{fontSize:16,color:T.txt,marginBottom:6}}>{selEx.name}</div>
        <div style={{fontSize:30,fontWeight:800,color:T.accent,margin:"6px 0"}}>{ds.totalSets} sets · {ds.totalReps} reps</div>
        <div style={{fontSize:12,color:T.sub}}>{ds.duration}min · {ds.startTime} – {ds.endTime}</div>
      </div>
      {cmpPrev&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:12}}>SET-BY-SET vs {fmtDate(cmpPrev.date)}</div>
          <div style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr 60px",gap:0,fontSize:11}}>
            {["SET","PREV","NOW","DIFF"].map(h=><div key={h} style={{padding:"5px 6px",color:T.sub,fontWeight:700,borderBottom:"2px solid "+T.bdr,textAlign:"center"}}>{h}</div>)}
            {Array.from({length:maxCmp},(_,i)=>{
              const cR=(ds.sets[i]&&ds.sets[i].reps);
              const pR=(cmpPrev.sets[i]&&cmpPrev.sets[i].reps);
              const diff=(cR!=null&&pR!=null)?cR-pR:null;
              const bg=i%2===0?T.ib+"88":"transparent";
              return[
                <div key={"s"+i} style={{padding:"6px",textAlign:"center",color:T.sub,background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{i+1}</div>,
                <div key={"p"+i} style={{padding:"6px",textAlign:"center",color:pR!=null?T.sub:"transparent",background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{pR!=null?pR:"—"}</div>,
                <div key={"c"+i} style={{padding:"6px",textAlign:"center",fontWeight:700,color:cR!=null?T.txt:"transparent",background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{cR!=null?cR:"—"}</div>,
                <div key={"d"+i} style={{padding:"6px",textAlign:"center",fontWeight:700,color:diff===null?T.sub:diff>0?T.green:diff<0?T.red:T.sub,background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{diff===null?"—":diff>0?"↑+"+diff:diff<0?"↓"+diff:"="}</div>
              ];
            }).flat()}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,background:T.ib,borderRadius:8,padding:"8px 12px"}}>
            <span style={{fontSize:12,color:T.sub}}>Before: {cmpPrev.totalSets}s · {cmpPrev.totalReps}r</span>
            <span style={{fontSize:13,fontWeight:700,color:(ds.totalReps-cmpPrev.totalReps)>=0?T.green:T.red}}>{(ds.totalReps-cmpPrev.totalReps)>=0?"↑+":"↓"}{ds.totalReps-cmpPrev.totalReps} reps</span>
          </div>
        </div>
      )}
      <button onClick={onBack} style={{...S.btn,width:"100%"}}>Done</button>
    </div>
  );
}

function TrainingTab({T,S,mob,wLogs,setWLogs,programs}){
  const[mode,setMode]=useState("idle");
  const[selDate,setSelDate]=useState(today());
  const[startTime,setStartTime]=useState("");
  const[endTime,setEndTime]=useState("");
  const[exercises,setExercises]=useState([]);
  const[amrapLogs,setAmrapLogs]=useState([]);
  const[circuits,setCircuits]=useState([]);
  const[emoms,setEmoms]=useState([]);
  const[note,setNote]=useState("");
  const[showProgPicker,setShowProgPicker]=useState(false);
  const[showAmrap,setShowAmrap]=useState(false);
  const[showCircuit,setShowCircuit]=useState(false);
  const[showEmom,setShowEmom]=useState(false);
  const[circuitDraft,setCircuitDraft]=useState(null);
  const[emomDraft,setEmomDraft]=useState(null);
  const[showDiscardConfirm,setShowDiscardConfirm]=useState(false);
  const[showRest,setShowRest]=useState(false);
  const[showExPicker,setShowExPicker]=useState(false);
  const[exSearch,setExSearch]=useState("");
  const[sessionSecs,setSessionSecs]=useState(0);
  const timerRef=useRef(null);
  useEffect(()=>{
    if(mode==="active"){timerRef.current=setInterval(()=>setSessionSecs(s=>s+1),1000);}
    else{clearInterval(timerRef.current);setSessionSecs(0);}
    return()=>clearInterval(timerRef.current);
  },[mode]);
  function startSession(){setStartTime(nowHHMM());setEndTime("");setExercises([]);setCircuits([]);setEmoms([]);setNote("");setCircuitDraft(null);setEmomDraft(null);setMode("active");}
  function saveWorkout(){
    if(exercises.length===0&&circuits.length===0&&emoms.length===0)return;
    const et=endTime||nowHHMM();
    const log={id:uid(),date:selDate,startTime,endTime:et,duration:calcDurMins(startTime,et),exercises,circuits,emoms,note};
    setWLogs(prev=>{const i=prev.findIndex(l=>l.date===selDate);if(i>=0){const n=[...prev];n[i]=log;return n;}return[...prev,log];});
    setMode("idle");
  }
  function discard(){setExercises([]);setCircuits([]);setEmoms([]);setNote("");setCircuitDraft(null);setEmomDraft(null);setMode("idle");setShowDiscardConfirm(false);}
  function addEx(ex){setExercises(prev=>[...prev,{id:uid(),name:ex.name,exId:ex.id,mu:ex.mu,sets:[{reps:"",weight:""}]}]);setShowExPicker(false);setExSearch("");}
  function rmEx(ei){setExercises(prev=>prev.filter((_,i)=>i!==ei));}
  function addSet(ei){setExercises(prev=>prev.map((ex,i)=>i===ei?{...ex,sets:[...ex.sets,{reps:"",weight:""}]}:ex));}
  function rmSet(ei,si){setExercises(prev=>prev.map((ex,i)=>i===ei?{...ex,sets:ex.sets.filter((_,j)=>j!==si)}:ex));}
  function updSet(ei,si,f,v){setExercises(prev=>prev.map((ex,i)=>i===ei?{...ex,sets:ex.sets.map((s,j)=>j===si?{...s,[f]:v}:s)}:ex));}
  function handleAmrapSave(sessions){if(sessions&&sessions.length>0)setAmrapLogs(prev=>[...prev,...sessions]);}
  function handleCircuitSave(circuit){setCircuits(prev=>[...prev,circuit]);}
  function handleEmomSave(data){setEmoms(prev=>[...prev,data]);}
  const filtered=EXDB.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.mu.toLowerCase().includes(exSearch.toLowerCase()));
  const sm=Math.floor(sessionSecs/60);const ss=sessionSecs%60;
  const sessionTs=(sm<10?"0":"")+sm+":"+(ss<10?"0":"")+ss;
  const recent=[...wLogs].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);

  if(mode==="idle"){
    return(
      <div style={{padding:mob?16:24,maxWidth:600,margin:"0 auto",paddingBottom:100}}>
        <div style={{fontSize:20,fontWeight:800,color:T.txt,marginBottom:24}}>Training</div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:T.sub,marginBottom:6,letterSpacing:1}}>WORKOUT DATE</div>
          <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)} style={S.inp}/>
        </div>
        <button onClick={startSession} style={{...S.btn,width:"100%",padding:"16px",fontSize:16,marginBottom:10,borderRadius:14}}>
          Start New Workout
        </button>
        <button onClick={()=>setShowProgPicker(true)} style={{...S.sm,width:"100%",padding:"12px",fontSize:13,marginBottom:20,borderRadius:12,color:T.accent,borderColor:T.accent+"55",fontWeight:600}}>
          Load from Program
        </button>
        {showProgPicker&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
            <div style={{...S.card,width:mob?"95vw":"420px",maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.accent+"44"}}>
              <div style={{fontWeight:700,fontSize:15,color:T.accent,marginBottom:14}}>Select Program</div>
              {programs.length===0
                ?<div style={{textAlign:"center",padding:"24px 0",color:T.sub,fontSize:13}}>No programs yet. Create them in the Program tab.</div>
                :<div style={{overflowY:"auto",flex:1}}>
                  {programs.map(p=>(
                    <button key={p.id} onClick={()=>{
                      const exs=(p.exercises||[]).map(ex=>({...ex,id:uid(),sets:(ex.sets||[]).map(s=>({...s}))}));
                      setExercises(exs);setAmrapLogs([]);setAmrapSingles([]);
                      setStartTime(nowHHMM());setEndTime("");setShowProgPicker(false);setMode("active");
                    }} style={{display:"flex",justifyContent:"space-between",width:"100%",textAlign:"left",padding:"12px 14px",background:T.ib,border:"1px solid "+T.bdr,borderRadius:12,cursor:"pointer",marginBottom:8,color:T.txt,fontFamily:"inherit"}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
                        <div style={{fontSize:11,color:T.sub,marginTop:3}}>{(p.exercises||[]).length} exercises · {(p.exercises||[]).reduce((s,e)=>s+(e.sets||[]).length,0)} sets</div>
                      </div>
                      <div style={{color:T.accent,fontWeight:700,fontSize:13,alignSelf:"center"}}>Load →</div>
                    </button>
                  ))}
                </div>
              }
              <button onClick={()=>setShowProgPicker(false)} style={{...S.sm,marginTop:10}}>Cancel</button>
            </div>
          </div>
        )}
        {recent.length>0&&(
          <div>
            <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:10}}>RECENT SESSIONS</div>
            {recent.map(log=>(
              <div key={log.date||log.id} style={{...S.card,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{fmtDate(log.date)}</div>
                    <div style={{fontSize:11,color:T.sub,marginTop:3}}>
                      {log.startTime&&log.endTime?log.startTime+" – "+log.endTime:""}
                      {log.duration?" · "+log.duration+"min":""}
                      {" · "+(log.exercises||[]).length+" exercises"}
                      {(log.circuits||[]).length>0?" · "+(log.circuits||[]).length+" Circuit":""}
                      {(log.emoms||[]).length>0?" · "+(log.emoms||[]).length+" EMOM":""}
                    </div>
                  </div>
                  <div style={{fontSize:22,color:T.accent,fontWeight:800}}>{(log.exercises||[]).length}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:120}}>
      <div style={{background:"linear-gradient(135deg,"+T.card+","+T.accent+"18)",border:"1px solid "+T.accent+"55",borderRadius:18,padding:18,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <div style={{fontSize:10,color:T.sub,letterSpacing:1,marginBottom:4}}>ACTIVE SESSION · {fmtDate(selDate)}</div>
            <div style={{fontSize:40,fontWeight:800,color:T.accent,fontVariantNumeric:"tabular-nums",lineHeight:1}}>{sessionTs}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:T.sub,marginBottom:2}}>Exercises</div>
            <div style={{fontSize:28,fontWeight:800,color:T.txt}}>{exercises.length}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4,letterSpacing:0.5}}>START TIME</div><input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} style={{...S.inp,padding:"8px 10px"}}/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4,letterSpacing:0.5}}>END TIME</div><input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} style={{...S.inp,padding:"8px 10px"}} placeholder="set at end"/></div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
        <button onClick={()=>setShowExPicker(true)} style={{...S.btn,padding:"11px 6px",fontSize:11,borderRadius:10}}>+ Exercise</button>
        <button onClick={()=>setShowCircuit(true)} style={{...S.sm,color:T.blue,borderColor:T.blue+"55",padding:"11px 6px",fontSize:11,fontWeight:700}}>{circuitDraft?"▶ Circuit":"Circuit"}</button>
        <button onClick={()=>setShowEmom(true)} style={{...S.sm,color:T.orange,borderColor:T.orange+"55",padding:"11px 6px",fontSize:11,fontWeight:700}}>{emomDraft?"▶ EMOM":"EMOM"}</button>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
        <button onClick={()=>setShowRest(true)} style={{...S.sm,color:T.blue,borderColor:T.blue+"44",padding:"5px 12px",fontSize:11}}>Rest Timer</button>
      </div>

      {/* Note field */}
      <div style={{marginBottom:12}}>
        <textarea value={note} onChange={e=>setNote(e.target.value)} style={{...S.inp,resize:"none",height:52,fontSize:12}} placeholder="Session notes (optional)..."/>
      </div>

      {exercises.length===0&&circuits.length===0&&emoms.length===0&&(
        <div style={{textAlign:"center",padding:"24px 16px",color:T.sub,fontSize:13}}>Tap the buttons above to add to your workout</div>
      )}

      {/* 📦 EXERCISES BOX */}
      {exercises.length>0&&(
        <div style={{...S.card,marginBottom:14,borderColor:T.accent+"44",border:"1px solid "+T.accent+"33"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:2,marginBottom:12}}>EXERCISES</div>
          {exercises.map((ex,ei)=>(
            <div key={ex.id} style={{marginBottom:14,paddingBottom:14,borderBottom:ei<exercises.length-1?"1px solid "+T.bdr:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div><div style={{fontWeight:700,fontSize:13,color:T.txt}}>{ex.name}</div><div style={{color:T.sub,fontSize:11,marginTop:1}}>{ex.mu}</div></div>
                <button onClick={()=>rmEx(ei)} style={{...S.sm,color:T.red,padding:"2px 8px",fontSize:11}}>Remove</button>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{borderBottom:"1px solid "+T.bdr}}>
                  <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"3px 5px",width:30,fontSize:10}}>SET</th>
                  <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"3px 5px",fontSize:10}}>REPS</th>
                  <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"3px 5px",fontSize:10}}>WEIGHT</th>
                  <th style={{width:26}}></th>
                </tr></thead>
                <tbody>
                  {ex.sets.map((set,si)=>(
                    <tr key={si} style={{borderBottom:"1px solid "+T.bdr+"55"}}>
                      <td style={{padding:"4px 5px",color:T.accent,fontWeight:700}}>{si+1}</td>
                      <td style={{padding:"3px 5px"}}><input value={set.reps} onChange={e=>updSet(ei,si,"reps",e.target.value)} style={{...S.inp,width:60,padding:"4px 7px"}} placeholder="--"/></td>
                      <td style={{padding:"3px 5px"}}><input value={set.weight} onChange={e=>updSet(ei,si,"weight",e.target.value)} style={{...S.inp,width:68,padding:"4px 7px"}} placeholder="BW"/></td>
                      <td style={{padding:"3px 5px"}}><button onClick={()=>rmSet(ei,si)} style={{...S.sm,padding:"2px 5px",color:T.red,fontSize:11}}>x</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={()=>addSet(ei)} style={{...S.sm,marginTop:6,fontSize:11,padding:"3px 9px"}}>+ Set</button>
            </div>
          ))}
        </div>
      )}

      {/* ⚡ CIRCUIT BOXES */}
      {circuits.map((c,ci)=>(
        <div key={c.id} style={{...S.card,marginBottom:12,border:"1px solid "+T.blue+"44"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.blue,letterSpacing:2,marginBottom:10}}>⚡ CIRCUIT{c.duration>0?" · "+c.duration+"min":""}{c.beepEvery>0?" · beep/"+c.beepEvery+"s":""}  </div>
          {c.exercises.map((ex,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<c.exercises.length-1?"1px solid "+T.bdr:"none",fontSize:12}}>
              <div style={{display:"flex",gap:8}}><span style={{color:T.blue,fontWeight:700}}>{i+1}</span><span style={{color:T.txt,fontWeight:600}}>{ex.name}</span><span style={{color:T.sub,fontSize:10}}>({ex.mu})</span></div>
              <span style={{color:T.sub}}>{ex.reps} reps{ex.weight&&ex.weight!=="BW"?" · "+ex.weight:""}</span>
            </div>
          ))}
        </div>
      ))}

      {/* 🔥 EMOM BOXES */}
      {emoms.map((a,ai)=>(
        <div key={a.id} style={{...S.card,marginBottom:12,border:"1px solid "+T.orange+"44"}}>
          <div style={{fontSize:10,fontWeight:700,color:T.orange,letterSpacing:2,marginBottom:6}}>🔥 EMOM · {a.exerciseName}</div>
          <div style={{fontSize:11,color:T.sub,marginBottom:8}}>{a.totalSets} sets · {a.totalReps} reps · {a.duration}min{a.goalTotal>0?" · Goal: "+a.goalTotal+"r":""}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {(a.sets||[]).map((st,i)=>(
              <div key={i} style={{background:T.orange+"15",borderRadius:8,padding:"4px 8px",textAlign:"center",minWidth:48}}>
                <div style={{fontSize:8,color:T.sub}}>#{i+1}</div>
                <div style={{fontSize:13,fontWeight:700,color:T.txt}}>{st.reps}</div>
                {st.weight>0&&<div style={{fontSize:8,color:T.sub}}>{st.weight}kg</div>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginTop:8}}>
        <button onClick={saveWorkout} disabled={exercises.length===0&&circuits.length===0&&emoms.length===0} style={{...S.btn,padding:"14px",fontSize:15,opacity:(exercises.length>0||circuits.length>0||emoms.length>0)?1:0.4}}>Save Workout</button>
        <button onClick={()=>setShowDiscardConfirm(true)} style={{...S.sm,color:T.red,borderColor:T.red+"44",padding:"14px",fontSize:13}}>Cancel</button>
      </div>
      {showDiscardConfirm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:800}}>
          <div style={{...S.card,width:mob?"88vw":"320px",textAlign:"center",padding:28}}>
            <div style={{fontSize:22,marginBottom:10}}>🗑️</div>
            <div style={{fontSize:16,fontWeight:700,color:T.txt,marginBottom:8}}>Cancel Workout?</div>
            <div style={{fontSize:13,color:T.sub,marginBottom:22}}>All progress will be lost.</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={discard} style={{...S.btn,flex:1,background:T.red,color:"#fff"}}>Yes, Cancel</button>
              <button onClick={()=>setShowDiscardConfirm(false)} style={{...S.sm,flex:1}}>Keep Going</button>
            </div>
          </div>
        </div>
      )}

      {showExPicker&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{...S.card,width:mob?"95vw":"420px",maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.accent+"33"}}>
            <div style={{fontWeight:700,fontSize:15,color:T.accent,marginBottom:12}}>Add Exercise</div>
            <input value={exSearch} onChange={e=>setExSearch(e.target.value)} style={{...S.inp,marginBottom:10}} placeholder="Search exercise or muscle..."/>
            <div style={{overflowY:"auto",flex:1}}>
              {filtered.map(ex=>(
                <button key={ex.id} onClick={()=>addEx(ex)} style={{display:"flex",width:"100%",textAlign:"left",padding:"10px 12px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:10,cursor:"pointer",marginBottom:5,color:T.txt,fontFamily:"inherit"}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{ex.name}</div><div style={{fontSize:11,color:T.sub,marginTop:2}}>{ex.typ} · {ex.mu}</div></div>
                </button>
              ))}
            </div>
            <button onClick={()=>setShowExPicker(false)} style={{...S.sm,marginTop:10}}>Close</button>
          </div>
        </div>
      )}
      {showCircuit&&<CircuitModal T={T} S={S} mob={mob} onSave={handleCircuitSave} onClose={()=>setShowCircuit(false)} draft={circuitDraft} onSaveDraft={setCircuitDraft}/>}
      {showRest&&<RestTimer T={T} S={S} onClose={()=>setShowRest(false)}/>}
      {showEmom&&<AMRAPSingleModal T={T} S={S} mob={mob} onSave={handleEmomSave} onClose={()=>setShowEmom(false)} draft={emomDraft} onSaveDraft={setEmomDraft}/>}
    </div>
  );
}
function ProgramTab({T,S,mob,programs,setPrograms}){
  const[view,setView]=useState("list");
  const[cur,setCur]=useState(null);
  const[exSearch,setExSearch]=useState("");
  const[showExPicker,setShowExPicker]=useState(false);
  function newProg(){
    const p={id:uid(),name:"New Program",exercises:[]};
    setPrograms(prev=>[...prev,p]);
    setCur(p);setView("edit");
  }
  function saveProg(updated){setPrograms(prev=>prev.map(p=>p.id===updated.id?updated:p));setCur(updated);}
  function delProg(id){setPrograms(prev=>prev.filter(p=>p.id!==id));setView("list");}
  function dupProg(p){
    const n={...p,id:uid(),name:p.name+" (Copy)",exercises:(p.exercises||[]).map(e=>({...e,id:uid(),sets:(e.sets||[]).map(s=>({...s}))}))};
    setPrograms(prev=>[...prev,n]);
  }
  function addEx(ex){
    const updated={...cur,exercises:[...(cur.exercises||[]),{id:uid(),name:ex.name,exId:ex.id,mu:ex.mu,sets:[{reps:"10",weight:"BW"}]}]};
    saveProg(updated);setShowExPicker(false);setExSearch("");
  }
  function rmEx(ei){saveProg({...cur,exercises:cur.exercises.filter((_,i)=>i!==ei)});}
  function addSet(ei){const exercises=cur.exercises.map((ex,i)=>i===ei?{...ex,sets:[...ex.sets,{reps:"10",weight:"BW"}]}:ex);saveProg({...cur,exercises});}
  function rmSet(ei,si){const exercises=cur.exercises.map((ex,i)=>i===ei?{...ex,sets:ex.sets.filter((_,j)=>j!==si)}:ex);saveProg({...cur,exercises});}
  function updSet(ei,si,f,v){const exercises=cur.exercises.map((ex,i)=>i===ei?{...ex,sets:ex.sets.map((s,j)=>j===si?{...s,[f]:v}:s)}:ex);saveProg({...cur,exercises});}
  const filtered=EXDB.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.mu.toLowerCase().includes(exSearch.toLowerCase()));

  if(view==="list") return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:20,fontWeight:800,color:T.txt}}>Programs</div>
        <button onClick={newProg} style={S.btn}>+ New Program</button>
      </div>
      {programs.length===0&&(
        <div style={{textAlign:"center",padding:"40px 20px",color:T.sub}}>
          <div style={{fontSize:13,marginBottom:8}}>No programs yet</div>
          <div style={{fontSize:11}}>Create programs here, then load them in Training</div>
        </div>
      )}
      {programs.map(p=>(
        <div key={p.id} style={{...S.card,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:T.txt}}>{p.name}</div>
              <div style={{color:T.sub,fontSize:11,marginTop:3}}>{(p.exercises||[]).length} exercises · {(p.exercises||[]).reduce((s,e)=>s+(e.sets||[]).length,0)} sets</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{setCur(p);setView("edit");}} style={{...S.sm,padding:"5px 10px"}}>Edit</button>
              <button onClick={()=>dupProg(p)} style={{...S.sm,padding:"5px 10px"}}>Copy</button>
              <button onClick={()=>delProg(p.id)} style={{...S.sm,color:T.red,padding:"5px 10px"}}>Del</button>
            </div>
          </div>
          {(p.exercises||[]).slice(0,3).map((ex,i)=>(
            <div key={i} style={{fontSize:12,color:T.sub,padding:"2px 0",borderTop:i===0?"1px solid "+T.bdr:"none",paddingTop:i===0?8:2}}>{ex.name} — {(ex.sets||[]).length} sets</div>
          ))}
          {(p.exercises||[]).length>3&&<div style={{fontSize:11,color:T.sub,marginTop:3}}>+{(p.exercises||[]).length-3} more</div>}
        </div>
      ))}
    </div>
  );

  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:100}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <button onClick={()=>setView("list")} style={S.sm}>Back</button>
        <input value={cur.name} onChange={e=>saveProg({...cur,name:e.target.value})} style={{...S.inp,fontSize:16,fontWeight:700,flex:1}} placeholder="Program name..."/>
      </div>
      <textarea value={cur.note||""} onChange={e=>saveProg({...cur,note:e.target.value})} style={{...S.inp,resize:"none",height:60,fontSize:12,marginBottom:14}} placeholder="Program notes, goals, schedule... (optional)"/>
      {(cur.exercises||[]).length===0&&<div style={{textAlign:"center",padding:"24px 16px",color:T.sub,fontSize:13}}>No exercises yet — tap below to add</div>}
      {(cur.exercises||[]).map((ex,ei)=>(
        <div key={ex.id} style={{...S.card,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div><div style={{fontWeight:700,fontSize:14,color:T.txt}}>{ex.name}</div><div style={{color:T.sub,fontSize:11,marginTop:2}}>{ex.mu}</div></div>
            <button onClick={()=>rmEx(ei)} style={{...S.sm,color:T.red,padding:"3px 9px",fontSize:11}}>Remove</button>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid "+T.bdr}}>
              <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"4px 6px",width:36,fontSize:10}}>SET</th>
              <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"4px 6px",fontSize:10}}>REPS</th>
              <th style={{color:T.sub,fontWeight:600,textAlign:"left",padding:"4px 6px",fontSize:10}}>WEIGHT</th>
              <th style={{width:28}}></th>
            </tr></thead>
            <tbody>
              {ex.sets.map((set,si)=>(
                <tr key={si} style={{borderBottom:"1px solid "+T.bdr+"66"}}>
                  <td style={{padding:"5px 6px",color:T.accent,fontWeight:700}}>{si+1}</td>
                  <td style={{padding:"4px 6px"}}><input value={set.reps} onChange={e=>updSet(ei,si,"reps",e.target.value)} style={{...S.inp,width:64,padding:"5px 8px"}} placeholder="10"/></td>
                  <td style={{padding:"4px 6px"}}><input value={set.weight} onChange={e=>updSet(ei,si,"weight",e.target.value)} style={{...S.inp,width:74,padding:"5px 8px"}} placeholder="BW"/></td>
                  <td style={{padding:"4px 6px"}}><button onClick={()=>rmSet(ei,si)} style={{...S.sm,padding:"2px 6px",color:T.red,fontSize:11}}>x</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={()=>addSet(ei)} style={{...S.sm,marginTop:8,fontSize:11,padding:"4px 10px"}}>+ Add Set</button>
        </div>
      ))}
      <button onClick={()=>setShowExPicker(true)} style={{...S.btn,width:"100%",marginBottom:16}}>+ Add Exercise</button>
      <button onClick={()=>setView("list")} style={{...S.sm,width:"100%",fontSize:13,padding:"12px"}}>Save & Back</button>
      {showExPicker&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{...S.card,width:mob?"95vw":"420px",maxHeight:"80vh",overflow:"hidden",display:"flex",flexDirection:"column",border:"1px solid "+T.accent+"33"}}>
            <div style={{fontWeight:700,fontSize:15,color:T.accent,marginBottom:12}}>Add Exercise</div>
            <input value={exSearch} onChange={e=>setExSearch(e.target.value)} style={{...S.inp,marginBottom:10}} placeholder="Search exercise or muscle..."/>
            <div style={{overflowY:"auto",flex:1}}>
              {filtered.map(ex=>(
                <button key={ex.id} onClick={()=>addEx(ex)} style={{display:"flex",width:"100%",textAlign:"left",padding:"10px 12px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:10,cursor:"pointer",marginBottom:5,color:T.txt,fontFamily:"inherit"}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{ex.name}</div><div style={{fontSize:11,color:T.sub,marginTop:2}}>{ex.typ} · {ex.mu}</div></div>
                </button>
              ))}
            </div>
            <button onClick={()=>setShowExPicker(false)} style={{...S.sm,marginTop:10}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}


function DietTab({T,S,mob,diets,setDiets,profile,priceDb}){
  const[selDate,setSelDate]=useState(today());
  const[selMeal,setSelMeal]=useState("Breakfast");
  const[foodSearch,setFoodSearch]=useState("");
  const[showPicker,setShowPicker]=useState(false);
  const[selFood,setSelFood]=useState(null);
  const[amount,setAmount]=useState("");
  const entries=diets.filter(d=>d.date===selDate);
  const myFoods=priceDb.map(p=>({
    id:"u_"+p.id,name:p.name,unit:p.unit||"1 serving",
    cal:parseFloat(p.cal)||0,p:parseFloat(p.p)||0,c:parseFloat(p.c)||0,f:parseFloat(p.f)||0,
    price:parseFloat(p.price)||0,priceUnit:p.priceUnit||"piece"
  }));
  function isPiece(food){return food.baseType==="piece"||food.priceUnit==="piece"||!(food.unit||"").toLowerCase().match(/^\d/);}
  function scaleFood(food,amt){
    const n=parseFloat(amt)||0;
    if(!n)return null;
    const piece=isPiece(food);
    const baseG=parseFloat(food.baseGrams)||100;
    const scale=piece?n:n/baseG;
    const pr=food.price||0;
    const pu=food.priceUnit||"piece";
    let cost=0;
    if(pu==="piece")cost=pr*n;
    else if(pu==="kg"){const grams=piece?n*baseG:n;cost=pr*grams/1000;}
    else if(pu==="100g"){const grams=piece?n*baseG:n;cost=pr*grams/100;}
    else if(pu==="g"){const grams=piece?n*baseG:n;cost=pr*grams;}
    return{
      cal:Math.round(food.cal*scale*10)/10,
      p:Math.round(food.p*scale*10)/10,
      c:Math.round(food.c*scale*10)/10,
      f:Math.round(food.f*scale*10)/10,
      cost:Math.round(cost*100)/100,
      label:piece?(n===1?"1 "+(food.pieceName||"piece"):n+" "+(food.pieceName||"piece")+"s"):(n+"g")
    };
  }
  function pickFood(food){setSelFood(food);setAmount("");setShowPicker(false);}
  function confirmAdd(){
    if(!selFood||!amount)return;
    const sc=scaleFood(selFood,amount);
    if(!sc)return;
    setDiets(prev=>[...prev,{id:uid(),date:selDate,meal:selMeal,name:selFood.name,unit:sc.label,cal:sc.cal,p:sc.p,c:sc.c,f:sc.f,cost:sc.cost}]);
    setSelFood(null);setAmount("");
  }
  function rmEntry(id){setDiets(prev=>prev.filter(e=>e.id!==id));}
  const filtered=myFoods.filter(f=>f.name.toLowerCase().includes(foodSearch.toLowerCase()));
  const totals=entries.reduce((a,e)=>({cal:a.cal+(e.cal||0),p:a.p+(e.p||0),c:a.c+(e.c||0),f:a.f+(e.f||0),cost:a.cost+(e.cost||0)}),{cal:0,p:0,c:0,f:0,cost:0});
  const nut=calcNut(profile);
  const preview=selFood&&amount?scaleFood(selFood,amount):null;
  const piece=selFood?isPiece(selFood):false;
  const hasCost=totals.cost>0;
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:20,fontWeight:800,color:T.txt}}>Diet</div>
        <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)} style={{...S.inp,width:"auto",fontSize:12,padding:"6px 10px"}}/>
      </div>
      {nut&&(
        <div style={{...S.card,marginBottom:12,padding:14}}>
          <div style={{fontSize:10,fontWeight:700,color:T.sub,marginBottom:10,letterSpacing:1}}>TODAY'S MACROS</div>
          <div style={{display:"flex",gap:8}}>
            {[{l:"Kcal",v:Math.round(totals.cal),g:nut.tdee,c:T.orange},{l:"Protein",v:Math.round(totals.p),g:nut.prot,c:T.blue,u:"g"},{l:"Carbs",v:Math.round(totals.c),g:nut.carb,c:T.green,u:"g"},{l:"Fat",v:Math.round(totals.f),g:nut.fat,c:T.yellow,u:"g"}].map(m=>{
              const pct=Math.min(100,m.g>0?Math.round(m.v/m.g*100):0);
              return(
                <div key={m.l} style={{flex:1,textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:700,color:m.c}}>{m.v}{m.u||""}</div>
                  <div style={{fontSize:9,color:T.sub,marginBottom:5}}>/{m.g}{m.u||""}</div>
                  <div style={{height:4,background:T.ib,borderRadius:2}}><div style={{height:"100%",width:pct+"%",background:m.c,borderRadius:2}}/></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {hasCost&&(
        <div style={{background:"linear-gradient(135deg,"+T.card+","+T.accent+"18)",border:"1px solid "+T.accent+"44",borderRadius:16,padding:"12px 16px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:4}}>TODAY'S FOOD COST</div>
            <div style={{fontSize:26,fontWeight:800,color:T.accent}}>GBP {totals.cost.toFixed(2)}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:T.sub}}>Per meal avg</div>
            <div style={{fontSize:16,fontWeight:700,color:T.txt}}>GBP {entries.length>0?(totals.cost/entries.length).toFixed(2):"0.00"}</div>
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {MEALS.map(m=><button key={m} onClick={()=>setSelMeal(m)} style={{...S.sm,whiteSpace:"nowrap",background:selMeal===m?T.accent+"22":"transparent",color:selMeal===m?T.accent:T.sub,borderColor:selMeal===m?T.accent+"55":T.bdr,fontWeight:selMeal===m?700:400}}>{m}</button>)}
      </div>
      {entries.length===0&&(
        <div style={{textAlign:"center",padding:"30px 20px"}}>
          <div style={{fontSize:13,color:T.sub,marginBottom:8}}>No food logged today</div>
          {priceDb.length===0&&<div style={{fontSize:11,color:T.sub}}>Add your foods in Settings first</div>}
        </div>
      )}
      {MEALS.map(meal=>{
        const mEntries=entries.filter(e=>e.meal===meal);
        if(mEntries.length===0)return null;
        const mCost=mEntries.reduce((s,e)=>s+(e.cost||0),0);
        return(
          <div key={meal} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:2,textTransform:"uppercase"}}>{meal}</div>
              {mCost>0&&<div style={{fontSize:11,color:T.accent,fontWeight:600}}>GBP {mCost.toFixed(2)}</div>}
            </div>
            {mEntries.map(e=>(
              <div key={e.id} style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,padding:"10px 14px"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:T.txt}}>{e.name}</div>
                  <div style={{fontSize:11,color:T.sub,marginTop:2}}>{e.unit} · {e.cal}kcal · P:{e.p}g C:{e.c}g F:{e.f}g</div>
                  {e.cost>0&&<div style={{fontSize:11,color:T.accent,marginTop:2}}>GBP {e.cost.toFixed(2)}</div>}
                </div>
                <button onClick={()=>rmEntry(e.id)} style={{...S.sm,color:T.red,padding:"2px 8px",fontSize:11}}>x</button>
              </div>
            ))}
          </div>
        );
      })}
      <button onClick={()=>setShowPicker(true)} style={{...S.btn,width:"100%",marginTop:4}}>+ Add to {selMeal}</button>
      {showPicker&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{...S.card,width:mob?"95vw":"420px",maxHeight:"80vh",display:"flex",flexDirection:"column",border:"1px solid "+T.accent+"33"}}>
            <div style={{fontWeight:700,fontSize:15,color:T.accent,marginBottom:4}}>Select Food — {selMeal}</div>
            <div style={{fontSize:11,color:T.sub,marginBottom:10}}>Tap to enter amount</div>
            {myFoods.length===0?(
              <div style={{textAlign:"center",padding:"30px 0",color:T.sub,fontSize:13}}>No custom foods yet. Add them in Settings first.</div>
            ):(
              <>
                <input value={foodSearch} onChange={e=>setFoodSearch(e.target.value)} style={{...S.inp,marginBottom:10}} placeholder="Search..."/>
                <div style={{overflowY:"auto",flex:1}}>
                  {filtered.length===0&&<div style={{textAlign:"center",padding:20,color:T.sub,fontSize:12}}>No results</div>}
                  {filtered.map(food=>(
                    <button key={food.id} onClick={()=>pickFood(food)} style={{display:"flex",justifyContent:"space-between",width:"100%",textAlign:"left",padding:"10px 12px",background:"transparent",border:"1px solid "+T.bdr,borderRadius:10,cursor:"pointer",marginBottom:5,color:T.txt,fontFamily:"inherit"}}>
                      <div><div style={{fontWeight:600,fontSize:13}}>{food.name}</div><div style={{fontSize:11,color:T.sub,marginTop:2}}>per {food.unit}</div></div>
                      <div style={{textAlign:"right",fontSize:11}}>
                        <div style={{color:T.orange,fontWeight:700}}>{food.cal} kcal</div>
                        <div style={{color:T.sub}}>P:{food.p} C:{food.c} F:{food.f}</div>
                        {food.price>0&&<div style={{color:T.accent,fontWeight:600}}>GBP {food.price}/{food.priceUnit}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
            <button onClick={()=>setShowPicker(false)} style={{...S.sm,marginTop:10}}>Cancel</button>
          </div>
        </div>
      )}
      {selFood&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}}>
          <div style={{...S.card,width:mob?"92vw":"360px",border:"1px solid "+T.accent+"55",padding:24}}>
            <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:4}}>ADDING TO {selMeal.toUpperCase()}</div>
            <div style={{fontSize:18,fontWeight:800,color:T.txt,marginBottom:4}}>{selFood.name}</div>
            <div style={{fontSize:12,color:T.sub,marginBottom:18}}>
              Base: {selFood.unit} · {selFood.cal}kcal{selFood.price>0?" · GBP "+selFood.price+"/"+selFood.priceUnit:""}
            </div>
            <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:8}}>{piece?"HOW MANY PIECES?":"HOW MANY GRAMS?"}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <input value={amount} onChange={e=>setAmount(e.target.value)} style={{...S.inp,fontSize:22,fontWeight:700,textAlign:"center",padding:"12px 10px"}} placeholder={piece?"1":"100"} type="number" min="0"/>
              <div style={{fontSize:16,fontWeight:700,color:T.sub,whiteSpace:"nowrap"}}>{piece?"piece":"g"}</div>
            </div>
            {preview?(
              <div style={{background:T.ib,borderRadius:12,padding:14,marginBottom:16}}>
                <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:10}}>CALCULATED VALUES</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:preview.cost>0?10:0}}>
                  {[{l:"Calories",v:preview.cal,u:"kcal",c:T.orange},{l:"Protein",v:preview.p,u:"g",c:T.blue},{l:"Carbs",v:preview.c,u:"g",c:T.green},{l:"Fat",v:preview.f,u:"g",c:T.yellow}].map(m=>(
                    <div key={m.l} style={{textAlign:"center",background:T.card,borderRadius:10,padding:"8px 6px"}}>
                      <div style={{fontSize:16,fontWeight:800,color:m.c}}>{m.v}<span style={{fontSize:10}}>{m.u}</span></div>
                      <div style={{fontSize:9,color:T.sub,marginTop:2}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                {preview.cost>0&&(
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:T.accent+"18",borderRadius:10,padding:"10px 14px"}}>
                    <div style={{fontSize:12,color:T.sub}}>Estimated Cost</div>
                    <div style={{fontSize:20,fontWeight:800,color:T.accent}}>GBP {preview.cost.toFixed(2)}</div>
                  </div>
                )}
              </div>
            ):(
              <div style={{background:T.ib,borderRadius:12,padding:14,marginBottom:16,textAlign:"center",color:T.sub,fontSize:12}}>Enter an amount to see calculated values</div>
            )}
            <div style={{display:"flex",gap:8}}>
              <button onClick={confirmAdd} disabled={!preview} style={{...S.btn,flex:1,opacity:preview?1:0.45}}>Add to Diary</button>
              <button onClick={()=>setSelFood(null)} style={{...S.sm,padding:"10px 16px"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HealthTab({T,S,mob,hLog,setHLog,profile}){
  const[form,setForm]=useState({date:today(),weight:"",chest:"",waist:"",armL:"",armR:"",thighL:"",thighR:"",sleep:""});
  function save(){if(!form.weight&&!form.chest&&!form.sleep)return;setHLog(prev=>{const i=prev.findIndex(l=>l.date===form.date);if(i>=0){const n=[...prev];n[i]={...prev[i],...form};return n;}return[...prev,{...form,id:uid()}];});}
  const entries=[...hLog].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  const FIELDS=[["Weight","weight","kg"],["Chest","chest","cm"],["Waist","waist","cm"],["Arm L","armL","cm"],["Arm R","armR","cm"],["Thigh L","thighL","cm"],["Thigh R","thighR","cm"],["Sleep","sleep","h"]];
  return(
    <div style={{padding:mob?14:24,maxWidth:700,margin:"0 auto"}}>
      <div style={{fontSize:20,fontWeight:800,color:T.txt,marginBottom:20}}>Health</div>
      <div style={{...S.card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:1}}>LOG MEASUREMENTS</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[["Date","date","date",""],["Weight (kg)","weight","text","75"],["Chest (cm)","chest","text",""],["Waist (cm)","waist","text",""],["Arm L (cm)","armL","text",""],["Arm R (cm)","armR","text",""],["Thigh L (cm)","thighL","text",""],["Thigh R (cm)","thighR","text",""],["Sleep (hrs)","sleep","text","8"]].map(([l,k,t,ph])=>(
            <div key={k}><div style={{fontSize:10,color:T.sub,marginBottom:4,letterSpacing:0.5}}>{l.toUpperCase()}</div><input type={t} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={{...S.inp,padding:"8px 10px"}} placeholder={ph}/></div>
          ))}
        </div>
        <button onClick={save} style={{...S.btn,width:"100%"}}>Save</button>
      </div>
      {entries.length>0&&(
        <div style={{...S.card,overflowX:"auto"}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>LAST 5 ENTRIES</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:520}}>
            <thead>
              <tr style={{borderBottom:"2px solid "+T.bdr}}>
                <th style={{padding:"6px 8px",textAlign:"left",color:T.sub,fontWeight:700,fontSize:10}}>DATE</th>
                {FIELDS.map(([l])=><th key={l} style={{padding:"6px 6px",textAlign:"center",color:T.sub,fontWeight:700,fontSize:10,whiteSpace:"nowrap"}}>{l.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry,ri)=>{
                const prev=entries[ri+1]||{};
                return(
                  <tr key={entry.date||ri} style={{borderBottom:"1px solid "+T.bdr,background:ri===0?T.ib+"55":"transparent"}}>
                    <td style={{padding:"8px 8px",fontWeight:700,color:T.txt,fontSize:11,whiteSpace:"nowrap"}}>{fmtDate(entry.date)}</td>
                    {FIELDS.map(([l,k,u])=>{
                      const val=entry[k]?parseFloat(entry[k]):null;
                      const pv=prev[k]?parseFloat(prev[k]):null;
                      const diff=(val!==null&&pv!==null)?val-pv:null;
                      return(
                        <td key={k} style={{padding:"8px 6px",textAlign:"center",verticalAlign:"middle"}}>
                          {val!==null?(
                            <div>
                              <div style={{fontWeight:ri===0?700:400,color:T.txt}}>{val.toFixed(1)}<span style={{fontSize:9,color:T.sub}}>{u}</span></div>
                              {diff!==null&&<div style={{fontSize:9,fontWeight:700,color:diff<0?T.green:diff>0?T.red:T.sub,marginTop:1}}>{diff>0?"+":""}{diff.toFixed(1)}</div>}
                            </div>
                          ):<span style={{color:T.sub,fontSize:10}}>—</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


function WorkoutDetailModal({T,S,mob,log,onClose}){
  if(!log)return null;
  function exportPDF(){
    const exRows=(log.exercises||[]).flatMap(ex=>(ex.sets||[]).map((s,i)=>
      "<tr><td>"+(i===0?ex.name:"")+"</td><td>"+(i===0?ex.mu:"")+"</td><td>"+(i+1)+"</td><td>"+(s.reps||"—")+"</td><td>"+(s.weight&&s.weight!=="BW"?s.weight+"kg":"BW")+"</td></tr>"
    )).join("");
    const amrapRows=(log.amrapLogs||[]).map((a,i)=>
      "<tr><td>"+(i+1)+"</td><td>"+(a.time||"")+"</td><td>"+fmtSecs(a.duration)+"</td><td>"+a.beepEvery+"s</td></tr>"
    ).join("");
    const singleSections=(log.emoms||[]).map(a=>{
      const setRows=(a.sets||[]).map((st,i)=>"<tr><td>"+(i+1)+"</td><td>"+st.reps+"</td><td>"+(st.weight>0?st.weight+"kg":"BW")+"</td></tr>").join("");
      return "<h3 style=\"color:#C9A84C;margin:18px 0 6px\">AMRAP Single — "+a.exerciseName+"</h3>"
        +(a.goalTotal>0?"<p style=\"color:#7A7860;font-size:12px\">Goal: "+a.goalTotal+" reps"+(a.goalSets>0?" / "+a.goalSets+" sets":"")+(a.goalRPS>0?" of "+a.goalRPS+"/set":"")+"</p>":"")
        +"<table><thead><tr><th>Set</th><th>Reps</th><th>Weight</th></tr></thead><tbody>"+setRows+"</tbody></table>"
        +"<p style=\"color:#C9A84C;font-weight:700\">Total: "+a.totalSets+" sets · "+a.totalReps+" reps · "+a.duration+"min</p>";
    }).join("");
    const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Workout ${log.date}</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#141610;color:#F0EAD0;font-family:'Segoe UI',sans-serif;padding:32px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
h1{color:#C9A84C;font-size:22px;margin-bottom:4px;}
.meta{color:#7A7860;font-size:13px;margin-bottom:24px;}
h2{color:#C9A84C;font-size:13px;letter-spacing:2px;margin:20px 0 10px;text-transform:uppercase;border-bottom:1px solid rgba(201,168,76,0.3);padding-bottom:6px;}
h3{color:#C9A84C;font-size:12px;letter-spacing:1px;margin:16px 0 6px;text-transform:uppercase;}
table{width:100%;border-collapse:collapse;margin-bottom:8px;}
thead tr{background:#C9A84C;}
thead td,thead th{color:#141610;font-weight:700;padding:8px 12px;font-size:12px;text-align:left;}
tbody tr:nth-child(even){background:rgba(201,168,76,0.06);}
tbody td{padding:7px 12px;font-size:12px;border-bottom:1px solid rgba(201,168,76,0.12);color:#F0EAD0;}
.footer{margin-top:32px;color:#7A7860;font-size:11px;border-top:1px solid rgba(201,168,76,0.2);padding-top:12px;}
@media print{body{background:#141610!important;}}
</style></head><body>
<h1>Workout — ${log.date?new Date(log.date+"T12:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):""}</h1>
<div class="meta">${log.startTime&&log.endTime?log.startTime+" – "+log.endTime+" · ":""}${log.duration?log.duration+" min · ":""}${(log.exercises||[]).length} exercises${(log.circuits||[]).length>0?" · "+(log.circuits||[]).length+" Circuit":""}${(log.emoms||[]).length>0?" · "+(log.emoms||[]).length+" EMOM":""}</div>
${exRows.length>0?`<h2>Exercises</h2><table><thead><tr><th>Exercise</th><th>Muscle</th><th>Set</th><th>Reps</th><th>Weight</th></tr></thead><tbody>${exRows}</tbody></table>`:""}
${amrapRows.length>0?`<h2>AMRAP Timer</h2><table><thead><tr><th>#</th><th>Time</th><th>Duration</th><th>Beep</th></tr></thead><tbody>${amrapRows}</tbody></table>`:""}
${singleSections}
<div class="footer">FitLife — Generated ${new Date().toLocaleString("en-GB")}</div>
</body></html>`;
    const w=window.open("","_blank","width=820,height=700");
    if(!w)return;
    w.document.write(html);
    w.document.close();
    setTimeout(()=>w.print(),400);
  }
  const totalSets=(log.exercises||[]).reduce((s,ex)=>s+(ex.sets||[]).length,0);
  const totalVol=(log.exercises||[]).reduce((sv,ex)=>(ex.sets||[]).reduce((s,st)=>s+(parseFloat(st.weight)||0)*(parseInt(st.reps)||0),sv),0);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:800,padding:"12px",overflowY:"auto"}}>
      <div style={{...S.card,width:mob?"98vw":"540px",maxHeight:"92vh",overflowY:"auto",border:"1px solid "+T.accent+"55",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:T.txt}}>{fmtDate(log.date)}</div>
            <div style={{fontSize:12,color:T.sub,marginTop:3}}>
              {log.startTime&&log.endTime?log.startTime+" – "+log.endTime+(log.duration?" ("+log.duration+"min)":"")+" · ":""}
              {totalSets} sets{totalVol>0?" · "+Math.round(totalVol)+"kg vol":""}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={exportPDF} style={{...S.btn,padding:"7px 14px",fontSize:12,background:T.accent+"22",color:T.accent,border:"1px solid "+T.accent+"44"}}>Export PDF</button>
            <button onClick={onClose} style={{...S.sm,padding:"7px 12px",fontSize:12}}>Close</button>
          </div>
        </div>
        {(log.exercises||[]).length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.accent,letterSpacing:2,marginBottom:10}}>EXERCISES</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{background:T.accent+"22"}}>
                  {["Exercise","Muscle","Set","Reps","Weight"].map(h=><th key={h} style={{padding:"7px 10px",textAlign:"left",color:T.accent,fontWeight:700,fontSize:10,letterSpacing:0.5,borderBottom:"2px solid "+T.accent+"44"}}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(log.exercises||[]).flatMap((ex,ei)=>(ex.sets||[]).map((s,si)=>(
                  <tr key={ei+"-"+si} style={{background:si%2===0?T.ib+"55":"transparent",borderBottom:"1px solid "+T.bdr+"44"}}>
                    <td style={{padding:"6px 10px",fontWeight:si===0?700:400,color:T.txt}}>{si===0?ex.name:""}</td>
                    <td style={{padding:"6px 10px",color:T.sub,fontSize:11}}>{si===0?ex.mu:""}</td>
                    <td style={{padding:"6px 10px",color:T.accent,fontWeight:700}}>{si+1}</td>
                    <td style={{padding:"6px 10px",color:T.txt}}>{s.reps||"—"}</td>
                    <td style={{padding:"6px 10px",color:T.txt}}>{s.weight&&s.weight!=="BW"?s.weight+"kg":"BW"}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        )}
        {(log.amrapLogs||[]).length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.orange,letterSpacing:2,marginBottom:10}}>AMRAP TIMER</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:T.orange+"22"}}>
                {["#","Time","Duration","Beep Interval"].map(h=><th key={h} style={{padding:"7px 10px",textAlign:"left",color:T.orange,fontWeight:700,fontSize:10,borderBottom:"2px solid "+T.orange+"44"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {(log.amrapLogs||[]).map((a,i)=>(
                  <tr key={i} style={{background:i%2===0?T.ib+"44":"transparent",borderBottom:"1px solid "+T.bdr+"44"}}>
                    <td style={{padding:"6px 10px",color:T.orange,fontWeight:700}}>{i+1}</td>
                    <td style={{padding:"6px 10px",color:T.txt}}>{a.time||"—"}</td>
                    <td style={{padding:"6px 10px",color:T.orange,fontWeight:700}}>{fmtSecs(a.duration)}</td>
                    <td style={{padding:"6px 10px",color:T.sub}}>{a.beepEvery}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {(log.circuits||[]).map((c,ci)=>(
          <div key={ci} style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.blue,letterSpacing:2,marginBottom:6}}>⚡ CIRCUIT {ci+1}{c.duration>0?" · "+c.duration+"min":""}</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:T.blue+"22"}}>{["Exercise","Muscle","Reps","Weight"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",color:T.blue,fontWeight:700,fontSize:10,borderBottom:"1px solid "+T.blue+"33"}}>{h}</th>)}</tr></thead>
              <tbody>{(c.exercises||[]).map((ex,i)=><tr key={i} style={{background:i%2===0?T.ib+"44":"transparent",borderBottom:"1px solid "+T.bdr+"33"}}><td style={{padding:"5px 10px",fontWeight:600,color:T.txt}}>{ex.name}</td><td style={{padding:"5px 10px",color:T.sub,fontSize:11}}>{ex.mu}</td><td style={{padding:"5px 10px",color:T.txt}}>{ex.reps}</td><td style={{padding:"5px 10px",color:T.sub}}>{ex.weight||"BW"}</td></tr>)}</tbody>
            </table>
          </div>
        ))}
        {(log.emoms||[]).map((a,ai)=>(
          <div key={ai} style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.orange,letterSpacing:2,marginBottom:4}}>🔥 EMOM</div>
            <div style={{fontSize:13,fontWeight:700,color:T.txt,marginBottom:2}}>{a.exerciseName} <span style={{fontSize:11,color:T.sub,fontWeight:400}}>({a.exerciseMu})</span></div>
            <div style={{fontSize:11,color:T.sub,marginBottom:8}}>{a.totalSets} sets · {a.totalReps} reps · {a.duration}min{a.goalTotal>0?" · Goal: "+a.goalTotal+"r":""}</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:T.pink+"22"}}>
                {["Set","Reps","Weight"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",color:T.pink,fontWeight:700,fontSize:10,borderBottom:"2px solid "+T.pink+"44"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {(a.sets||[]).map((st,i)=>(
                  <tr key={i} style={{background:i%2===0?T.ib+"44":"transparent",borderBottom:"1px solid "+T.bdr+"44"}}>
                    <td style={{padding:"5px 10px",color:T.pink,fontWeight:700}}>{i+1}</td>
                    <td style={{padding:"5px 10px",color:T.txt,fontWeight:600}}>{st.reps}</td>
                    <td style={{padding:"5px 10px",color:T.sub}}>{st.weight>0?st.weight+"kg":"BW"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        {(log.exercises||[]).length===0&&(log.circuits||[]).length===0&&(log.emoms||[]).length===0&&(
          <div style={{textAlign:"center",padding:30,color:T.sub,fontSize:13}}>No detailed data saved</div>
        )}
      </div>
    </div>
  );
}

function HistoryTab({T,S,mob,wLogs}){
  const[selLog,setSelLog]=useState(null);
  const[selEx,setSelEx]=useState(null);
  const[detailLog,setDetailLog]=useState(null);
  const regLogs=wLogs.filter(l=>l.type!=="amrap_single");
  const amrapSingleLogs=[...wLogs].filter(l=>l.type==="amrap_single").sort((a,b)=>b.date.localeCompare(a.date));
  const sorted=[...regLogs].sort((a,b)=>b.date.localeCompare(a.date));
  const weekAgo=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
  const twoWkAgo=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
  const muscleCounts={};
  regLogs.filter(l=>l.date>=weekAgo).forEach(l=>(l.exercises||[]).forEach(e=>{if(e.mu)muscleCounts[e.mu]=(muscleCounts[e.mu]||0)+1;}));
  const exMap={};
  regLogs.forEach(l=>(l.exercises||[]).forEach(e=>{
    if(!exMap[e.name])exMap[e.name]=[];
    const sets=e.sets||[];
    const maxW=sets.length?Math.max(...sets.map(s=>parseFloat(s.weight)||0)):0;
    const maxR=sets.length?Math.max(...sets.map(s=>parseInt(s.reps)||0)):0;
    exMap[e.name].push({date:l.date,maxW,maxR});
  }));
  const exNames=Object.keys(exMap).sort();
  const curEx=selEx||exNames[0]||"";
  const exData=curEx?(exMap[curEx]||[]).sort((a,b)=>a.date.localeCompare(b.date)).slice(-10).map(d=>({date:fmtDate(d.date),weight:d.maxW,reps:d.maxR})):[];
  // Progress comparison: this week vs last week
  const progMap={};
  regLogs.forEach(log=>{
    const tw=log.date>=weekAgo;
    const lw=log.date>=twoWkAgo&&log.date<weekAgo;
    if(!tw&&!lw)return;
    (log.exercises||[]).forEach(ex=>{
      if(!progMap[ex.name])progMap[ex.name]={};
      const sets=ex.sets||[];
      const maxW=sets.length?Math.max(0,...sets.map(s=>parseFloat(s.weight)||0)):0;
      const maxR=sets.length?Math.max(0,...sets.map(s=>parseInt(s.reps)||0)):0;
      const key=tw?"tw":"lw";
      if(!progMap[ex.name][key]||maxW>(progMap[ex.name][key].maxW||0)){progMap[ex.name][key]={maxW,maxR};}
    });
  });
  const progRows=Object.entries(progMap).filter(([_,v])=>v.tw||v.lw);
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto"}}>
      <div style={{fontSize:20,fontWeight:800,color:T.txt,marginBottom:20}}>History</div>
      {Object.keys(muscleCounts).length>0&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>THIS WEEK — MUSCLES</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {MUSCLES.map(m=><div key={m} style={{background:muscleCounts[m]?T.accent+"22":T.ib,border:"1px solid "+(muscleCounts[m]?T.accent+"55":T.bdr),borderRadius:20,padding:"4px 11px",fontSize:11,color:muscleCounts[m]?T.accent:T.sub,fontWeight:muscleCounts[m]?700:400}}>{m}{muscleCounts[m]?" ×"+muscleCounts[m]:""}</div>)}
          </div>
        </div>
      )}
      {progRows.length>0&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>PROGRESS — THIS WEEK vs LAST WEEK</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto auto auto",gap:0,fontSize:11}}>
            {["EXERCISE","LAST WEEK","THIS WEEK","CHANGE"].map(h=><div key={h} style={{padding:"5px 6px",color:T.sub,fontWeight:700,borderBottom:"2px solid "+T.bdr,fontSize:9,letterSpacing:0.5}}>{h}</div>)}
            {progRows.map(([name,v],ri)=>{
              const tw=v.tw||{maxW:0,maxR:0};
              const lw=v.lw||{maxW:0,maxR:0};
              const useW=tw.maxW>0||lw.maxW>0;
              const curVal=useW?tw.maxW:tw.maxR;
              const prevVal=useW?lw.maxW:lw.maxR;
              const diff=v.tw&&v.lw?curVal-prevVal:null;
              const bg=ri%2===0?T.ib+"55":"transparent";
              return[
                <div key={name+"n"} style={{padding:"7px 6px",color:T.txt,fontWeight:600,background:bg,borderBottom:"1px solid "+T.bdr+"33",fontSize:11}}>{name}</div>,
                <div key={name+"l"} style={{padding:"7px 6px",textAlign:"center",color:T.sub,background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{v.lw?(useW&&lw.maxW>0?lw.maxW+"kg":lw.maxR+"r"):"—"}</div>,
                <div key={name+"t"} style={{padding:"7px 6px",textAlign:"center",fontWeight:700,color:T.txt,background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{v.tw?(useW&&tw.maxW>0?tw.maxW+"kg":tw.maxR+"r"):"—"}</div>,
                <div key={name+"d"} style={{padding:"7px 6px",textAlign:"center",fontWeight:800,color:diff===null?T.sub:diff>0?T.green:diff<0?T.red:T.sub,background:bg,borderBottom:"1px solid "+T.bdr+"33"}}>{diff===null?"—":diff>0?"↑+"+diff+(useW?"kg":""):diff<0?"↓"+Math.abs(diff)+(useW?"kg":""):"="}</div>
              ];
            }).flat()}
          </div>
        </div>
      )}
      {amrapSingleLogs.length>0&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.orange,marginBottom:10,letterSpacing:1}}>AMRAP SINGLE SESSIONS</div>
          {amrapSingleLogs.map((l,li)=>{
            const prev=amrapSingleLogs[li+1]&&amrapSingleLogs[li+1].exerciseName===l.exerciseName?amrapSingleLogs[li+1]:null;
            const isOpen=selLog===("amrap_"+l.id);
            return(
              <div key={l.id} style={{...S.card,marginBottom:8,cursor:"pointer",borderColor:T.orange+"33"}} onClick={()=>setSelLog(isOpen?null:"amrap_"+l.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{l.exerciseName} <span style={{fontSize:10,color:T.orange,fontWeight:700}}>AMRAP</span></div>
                    <div style={{fontSize:11,color:T.sub,marginTop:2}}>{fmtDate(l.date)} · {l.totalSets}s · {l.totalReps}r · {l.duration}min</div>
                  </div>
                  <div style={{color:T.orange,fontSize:14,fontWeight:700}}>{isOpen?"▲":"▼"}</div>
                </div>
                {isOpen&&(
                  <div style={{marginTop:10}}>
                    {prev&&(
                      <div>
                        <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:8}}>SET-BY-SET vs {fmtDate(prev.date)}</div>
                        <div style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr 60px",fontSize:11,marginBottom:8}}>
                          {["SET","PREV","NOW","DIFF"].map(h=><div key={h} style={{padding:"4px 5px",color:T.sub,fontWeight:700,borderBottom:"1px solid "+T.bdr,textAlign:"center"}}>{h}</div>)}
                          {Array.from({length:Math.max(l.sets.length,(prev.sets||[]).length)},(_,i)=>{
                            const cR=(l.sets[i]&&l.sets[i].reps);
                            const pR=(prev.sets[i]&&prev.sets[i].reps);
                            const diff=(cR!=null&&pR!=null)?cR-pR:null;
                            const bg=i%2===0?T.ib+"44":"transparent";
                            return[
                              <div key={"s"+i} style={{padding:"5px",textAlign:"center",color:T.sub,background:bg}}>{i+1}</div>,
                              <div key={"p"+i} style={{padding:"5px",textAlign:"center",color:T.sub,background:bg}}>{pR!=null?pR:"—"}</div>,
                              <div key={"c"+i} style={{padding:"5px",textAlign:"center",fontWeight:700,color:T.txt,background:bg}}>{cR!=null?cR:"—"}</div>,
                              <div key={"d"+i} style={{padding:"5px",textAlign:"center",fontWeight:700,color:diff===null?T.sub:diff>0?T.green:diff<0?T.red:T.sub,background:bg}}>{diff===null?"—":diff>0?"↑+"+diff:diff<0?"↓"+Math.abs(diff):"="}</div>
                            ];
                          }).flat()}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",background:T.orange+"11",borderRadius:8,padding:"6px 10px"}}>
                          <span style={{fontSize:11,color:T.sub}}>Prev: {prev.totalReps}r</span>
                          <span style={{fontSize:12,fontWeight:700,color:(l.totalReps-prev.totalReps)>=0?T.green:T.red}}>{(l.totalReps-prev.totalReps)>=0?"↑+":"↓"}{Math.abs(l.totalReps-prev.totalReps)} reps</span>
                        </div>
                      </div>
                    )}
                    {!prev&&<div style={{fontSize:11,color:T.sub}}>First session — no comparison available yet</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {exNames.length>0&&(
        <div style={{...S.card,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>EXERCISE PROGRESS</div>
          <select value={curEx} onChange={e=>setSelEx(e.target.value)} style={{...S.inp,marginBottom:12}}>{exNames.map(n=><option key={n} value={n}>{n}</option>)}</select>
          {exData.length>1&&(
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={exData}>
                <XAxis dataKey="date" tick={{fontSize:9,fill:T.sub}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:9,fill:T.sub}} axisLine={false} tickLine={false} domain={["auto","auto"]}/>
                <Tooltip contentStyle={{background:T.sb,border:"1px solid "+T.bdr,borderRadius:10,fontSize:11}} labelStyle={{color:T.txt}}/>
                <Line dataKey="weight" stroke={T.accent} strokeWidth={2} dot={{r:3,fill:T.accent,strokeWidth:0}} name="Max Weight (kg)"/>
                <Line dataKey="reps" stroke={T.blue} strokeWidth={2} dot={{r:3,fill:T.blue,strokeWidth:0}} name="Max Reps"/>
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
      <div style={{fontSize:11,fontWeight:700,color:T.sub,marginBottom:10,letterSpacing:1}}>ALL SESSIONS</div>
      {sorted.length===0&&<div style={{color:T.sub,fontSize:13,textAlign:"center",padding:30}}>No sessions yet</div>}
      {sorted.map(l=>(
        <div key={l.date||l.id} onClick={()=>setDetailLog(l)} style={{...S.card,marginBottom:8,cursor:"pointer",transition:"border-color 0.2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{fmtDate(l.date)}</div>
              <div style={{fontSize:11,color:T.sub,marginTop:3}}>
                {l.startTime&&l.endTime?l.startTime+" – "+l.endTime+(l.duration?" ("+l.duration+"min)":"")+" · ":""}
                {(l.exercises||[]).length} exercises
                {(l.amrapLogs||[]).length>0?" · "+(l.amrapLogs||[]).length+" AMRAP":""}
                {(l.emoms||[]).length>0?" · "+(l.emoms||[]).length+" EMOM":""}
              </div>
            </div>
            <div style={{color:T.accent,fontSize:13,color:T.sub}}>View →</div>
          </div>
        </div>
      ))}
      {detailLog&&<WorkoutDetailModal T={T} S={S} mob={mob} log={detailLog} onClose={()=>setDetailLog(null)}/>}
    </div>
  );
}

function FinanceSources({T,S,mob,sources,setSources,setTxns,newSrc,setNewSrc,addSrc,delSrc,SRC_COLORS}){
  const[showTransfer,setShowTransfer]=useState(false);
        const[trFrom,setTrFrom]=useState("");
        const[trTo,setTrTo]=useState("");
        const[trAmt,setTrAmt]=useState("");
        const[trNote,setTrNote]=useState("");
        function doTransfer(){
          const amt=parseFloat(trAmt)||0;
          if(!trFrom||!trTo||trFrom===trTo||amt<=0)return;
          const fromName=(sources.find(function(s){return s.id===trFrom})||{}).name||"";
          const toName=(sources.find(function(s){return s.id===trTo})||{}).name||"";
          setSources(prev=>prev.map(s=>{if(s.id===trFrom)return{...s,balance:Math.round((s.balance-amt)*100)/100};if(s.id===trTo)return{...s,balance:Math.round((s.balance+amt)*100)/100};return s;}));
          setTxns(prev=>[{id:uid(),type:"transfer",amount:amt,sourceId:trFrom,toSourceId:trTo,cat:"Transfer",desc:fromName+" → "+toName+(trNote?" · "+trNote:""),date:today()},...prev]);
          setTrAmt("");setTrNote("");setShowTransfer(false);
        }
        const[selBank,setSelBank]=useState("");
        const[customBal,setCustomBal]=useState("");
        const BANK_OPTS=[{v:"lloyds",l:"Lloyds Bank",bg:"linear-gradient(135deg,#006A4E,#00A650)",logo:"L"},{v:"monzo",l:"Monzo",bg:"linear-gradient(135deg,#FF3264,#FF6B8A)",logo:"M"},{v:"revolut",l:"Revolut",bg:"linear-gradient(135deg,#191C1F,#3D3F42)",logo:"R"},{v:"saving",l:"Saving Account",bg:"linear-gradient(135deg,#1C3A6B,#2A5CA0)",logo:"S"},{v:"custom",l:"Custom",bg:"",logo:""}];
        function addBankSrc(){
          const b=BANK_OPTS.find(o=>o.v===selBank);
          if(!b)return;
          const bal=parseFloat(customBal)||0;
          if(b.v==="custom"){if(!newSrc.name)return;setSources(prev=>[...prev,{id:uid(),name:newSrc.name,balance:bal,color:newSrc.color||"#555",bank:"custom"}]);setNewSrc(p=>({...p,name:""}));}
          else{if(sources.some(s=>s.bank===b.v))return;setSources(prev=>[...prev,{id:uid(),name:b.l,balance:bal,color:b.bg,bank:b.v}]);}
          setSelBank("");setCustomBal("");
        }
        const bgs={lloyds:"linear-gradient(135deg,#006A4E,#00A650)",monzo:"linear-gradient(135deg,#FF3264,#FF6B8A)",revolut:"linear-gradient(135deg,#191C1F,#3D3F42)",saving:"linear-gradient(135deg,#1C3A6B,#2A5CA0)"};
        const logos={lloyds:"L",monzo:"M",revolut:"R",saving:"S"};
  return(
    <div>
            <div style={{...S.card,marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:T.sub,marginBottom:8,letterSpacing:1}}>ADD ACCOUNT</div>
              <div style={{marginBottom:8}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>SELECT BANK / TYPE</div>
                <select value={selBank} onChange={e=>setSelBank(e.target.value)} style={S.inp}>
                  <option value="">Select...</option>
                  {BANK_OPTS.map(o=><option key={o.v} value={o.v} disabled={o.v!=="custom"&&o.v!=="saving"&&sources.some(s=>s.bank===o.v)}>{o.l}</option>)}
                </select>
              </div>
              {selBank==="custom"&&(
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:10,color:T.sub,marginBottom:4}}>ACCOUNT NAME</div>
                  <input value={newSrc.name} onChange={e=>setNewSrc(p=>({...p,name:e.target.value}))} style={S.inp} placeholder="e.g. Cash, Barclays..."/>
                </div>
              )}
              {selBank&&(
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,color:T.sub,marginBottom:4}}>INITIAL BALANCE (GBP)</div>
                  <input value={customBal} onChange={e=>setCustomBal(e.target.value)} style={S.inp} placeholder="0.00" type="number"/>
                </div>
              )}
              <button onClick={addBankSrc} disabled={!selBank} style={{...S.btn,background:"#34C759",opacity:selBank?1:0.4}}>Add Account</button>
            </div>
            <button onClick={()=>setShowTransfer(!showTransfer)} style={{...S.sm,width:"100%",marginBottom:10,padding:"10px",color:T.blue,borderColor:T.blue+"44",fontWeight:600}}>⇄ Transfer Between Sources</button>
            {showTransfer&&(
              <div style={{...S.card,marginBottom:12,border:"1px solid "+T.blue+"44"}}>
                <div style={{fontSize:10,fontWeight:700,color:T.blue,marginBottom:10,letterSpacing:1}}>TRANSFER</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>FROM</div><select value={trFrom} onChange={e=>setTrFrom(e.target.value)} style={S.inp}><option value="">Select...</option>{sources.map(s=><option key={s.id} value={s.id}>{s.name} (GBP {s.balance.toFixed(2)})</option>)}</select></div>
                  <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TO</div><select value={trTo} onChange={e=>setTrTo(e.target.value)} style={S.inp}><option value="">Select...</option>{sources.filter(s=>s.id!==trFrom).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                  <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>AMOUNT (GBP)</div><input value={trAmt} onChange={e=>setTrAmt(e.target.value)} style={S.inp} placeholder="0.00" type="number"/></div>
                  <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NOTE</div><input value={trNote} onChange={e=>setTrNote(e.target.value)} style={S.inp} placeholder="optional..."/></div>
                </div>
                <button onClick={doTransfer} disabled={!trFrom||!trTo||!trAmt} style={{...S.btn,width:"100%",background:"#34C759",opacity:trFrom&&trTo&&trAmt?1:0.4}}>Confirm Transfer</button>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {sources.map(s=>(
                <div key={s.id}>
                  {["lloyds","monzo","revolut","saving"].includes(s.bank)?(
                    <div style={{background:bgs[s.bank],borderRadius:20,padding:"20px 24px",color:"#FFF",position:"relative",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                        <div style={{fontSize:15,fontWeight:700}}>{s.name}</div>
                        <div style={{fontSize:20,background:"rgba(255,255,255,0.15)",borderRadius:10,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{logos[s.bank]}</div>
                      </div>
                      <div style={{fontSize:30,fontWeight:900,letterSpacing:-1}}>GBP {s.balance.toFixed(2)}</div>
                      <button onClick={()=>delSrc(s.id)} style={{position:"absolute",top:12,right:12,background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,color:"#fff",padding:"4px 9px",cursor:"pointer",fontSize:11}}>✕</button>
                    </div>
                  ):(
                    <div style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:14,height:14,borderRadius:"50%",background:s.color||T.accent}}/><div><div style={{fontWeight:700,fontSize:13,color:T.txt}}>{s.name}</div><div style={{fontSize:11,color:T.sub}}>GBP {s.balance.toFixed(2)}</div></div></div>
                      <button onClick={()=>delSrc(s.id)} style={{...S.sm,color:T.red,fontSize:11}}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
  );
}

function FinanceReport({T,S,mob,repTxns,repFrom,setRepFrom,repTo,setRepTo,sources}){
  const[repSearch,setRepSearch]=useState("");
        const filtered=repTxns.filter(t=>{const q=repSearch.toLowerCase();return!q||t.cat.toLowerCase().includes(q)||(t.desc||"").toLowerCase().includes(q);}).sort((a,b)=>b.date.localeCompare(a.date));
        const totInc=repTxns.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
        const totExp=repTxns.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
        function repPDF(){
          const rows=filtered.map(t=>"<tr><td>"+t.date+"</td><td>"+t.cat+(t.desc?" · "+t.desc:"")+"</td><td style='color:"+(t.type==="income"?"#34C759":"#FF3B30")+"'>"+(t.type==="income"?"+":"-")+"GBP "+t.amount.toFixed(2)+"</td><td>"+(t.sourceId&&sources.find(s=>s.id===t.sourceId)?sources.find(s=>s.id===t.sourceId).name:"")+"</td></tr>").join("");
          const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Finance Report</title><style>body{background:#fff;color:#000;font-family:sans-serif;padding:24px;} h1{font-size:20px;margin-bottom:4px;} .meta{color:#888;font-size:13px;margin-bottom:20px;} table{width:100%;border-collapse:collapse;} th{background:#000;color:#fff;padding:8px 12px;text-align:left;font-size:12px;} td{padding:7px 12px;border-bottom:1px solid #eee;font-size:12px;} .sum{display:flex;gap:24px;margin:16px 0;padding:16px;background:#f5f5f5;border-radius:8px;} .inc{color:#34C759;font-weight:700;font-size:16px;} .exp{color:#FF3B30;font-weight:700;font-size:16px;} .net{font-weight:700;font-size:16px;} @media print{body{-webkit-print-color-adjust:exact;}}</style></head><body><h1>Finance Report</h1><div class="meta">${repFrom} — ${repTo} · ${filtered.length} transactions</div><div class="sum"><div><div class="inc">+ GBP ${totInc.toFixed(2)}</div><div style="font-size:11px;color:#888">Income</div></div><div><div class="exp">- GBP ${totExp.toFixed(2)}</div><div style="font-size:11px;color:#888">Expenses</div></div><div><div class="net">= GBP ${(totInc-totExp).toFixed(2)}</div><div style="font-size:11px;color:#888">Net</div></div></div><table><thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Source</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
          const w=window.open("","_blank","width=820,height=700");if(!w)return;w.document.write(html);w.document.close();setTimeout(()=>w.print(),400);
        }
  return(
    <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>FROM</div><input type="date" value={repFrom} onChange={e=>setRepFrom(e.target.value)} style={S.inp}/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TO</div><input type="date" value={repTo} onChange={e=>setRepTo(e.target.value)} style={S.inp}/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
              <div style={{...S.card,textAlign:"center",padding:12}}><div style={{fontSize:15,fontWeight:700,color:T.green}}>+{totInc.toFixed(2)}</div><div style={{fontSize:9,color:T.sub,marginTop:2}}>Income</div></div>
              <div style={{...S.card,textAlign:"center",padding:12}}><div style={{fontSize:15,fontWeight:700,color:T.red}}>-{totExp.toFixed(2)}</div><div style={{fontSize:9,color:T.sub,marginTop:2}}>Expenses</div></div>
              <div style={{...S.card,textAlign:"center",padding:12}}><div style={{fontSize:15,fontWeight:700,color:totInc-totExp>=0?T.green:T.red}}>{(totInc-totExp>=0?"+":"")+( totInc-totExp).toFixed(2)}</div><div style={{fontSize:9,color:T.sub,marginTop:2}}>Net</div></div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={repSearch} onChange={e=>setRepSearch(e.target.value)} style={{...S.inp,flex:1}} placeholder="Search transactions..."/>
              <button onClick={repPDF} style={{...S.btn,padding:"9px 14px",fontSize:12,whiteSpace:"nowrap"}}>Export PDF</button>
            </div>
            <div style={{...S.card,padding:0,overflow:"hidden"}}>
              <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,padding:"10px 14px",borderBottom:"1px solid "+T.bdr}}>ALL TRANSACTIONS ({filtered.length})</div>
              {filtered.length===0&&<div style={{textAlign:"center",padding:"24px",color:T.sub,fontSize:13}}>No transactions in this period</div>}
              {filtered.map((t,i)=>(
                <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:i<filtered.length-1?"1px solid "+T.bdr:"none",background:i%2===0?T.ib+"44":"transparent"}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:600,color:T.txt}}>{t.cat}{t.desc?" · "+t.desc:""}</div>
                    <div style={{fontSize:10,color:T.sub,marginTop:2}}>{t.date}{t.sourceId&&sources.find(s=>s.id===t.sourceId)?" · "+sources.find(s=>s.id===t.sourceId).name:""}</div>
                  </div>
                  <div style={{fontWeight:700,fontSize:13,color:t.type==="income"?T.green:t.type==="transfer"?T.blue:T.red}}>{t.type==="income"?"+":t.type==="transfer"?"↔":"-"}GBP {t.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
  );
}

function FinanceTab({T,S,mob,sources,setSources,txns,setTxns,subs,setSubs,debts,setDebts,goals,setGoals}){
  const[ftab,setFtab]=useState("overview");
  const[newSrc,setNewSrc]=useState({name:"",balance:"",color:SRC_COLORS[0]});
  const[txForm,setTxForm]=useState({type:"expense",amount:"",sourceId:"",cat:"Groceries",desc:"",date:today()});
  const[subForm,setSubForm]=useState({name:"",amount:"",dayOfMonth:"",sourceId:"",subType:"expense",autoDeduct:false});
  const[debtForm,setDebtForm]=useState({person:"",amount:"",type:"owe_me",date:today(),note:""});
  const[goalForm,setGoalForm]=useState({name:"",target:"",current:"",deadline:""});
  const[repFrom,setRepFrom]=useState(today().slice(0,8)+"01");const[repTo,setRepTo]=useState(today());
  function addSrc(){if(!newSrc.name)return;setSources(prev=>[...prev,{id:uid(),name:newSrc.name,balance:parseFloat(newSrc.balance)||0,color:newSrc.color}]);setNewSrc({name:"",balance:"",color:SRC_COLORS[sources.length%SRC_COLORS.length]});}
  function delSrc(id){setSources(prev=>prev.filter(s=>s.id!==id));}
  function addTxn(){if(!txForm.amount)return;const amt=parseFloat(txForm.amount)||0;if(txForm.sourceId)setSources(prev=>prev.map(s=>s.id!==txForm.sourceId?s:{...s,balance:Math.round((s.balance+(txForm.type==="income"?amt:-amt))*100)/100}));setTxns(prev=>[{id:uid(),...txForm,amount:amt},...prev]);setTxForm(p=>({...p,amount:"",desc:""}));}
  function delTxn(t){if(t.sourceId)setSources(prev=>prev.map(s=>s.id!==t.sourceId?s:{...s,balance:Math.round((s.balance+(t.type==="income"?-t.amount:t.amount))*100)/100}));setTxns(prev=>prev.filter(x=>x.id!==t.id));}
  function addSub(){if(!subForm.name||!subForm.amount)return;setSubs(prev=>[...prev,{id:uid(),...subForm,amount:parseFloat(subForm.amount)||0,dayOfMonth:parseInt(subForm.dayOfMonth)||1}]);setSubForm({name:"",amount:"",dayOfMonth:"",sourceId:"",subType:"expense",autoDeduct:false});}
  function delSub(id){setSubs(prev=>prev.filter(s=>s.id!==id));}
  function addDebt(){if(!debtForm.person||!debtForm.amount)return;setDebts(prev=>[...prev,{id:uid(),...debtForm,amount:parseFloat(debtForm.amount)||0,settled:false}]);setDebtForm({person:"",amount:"",type:"owe_me",date:today(),note:""});}
  function settleDebt(id){setDebts(prev=>prev.map(d=>d.id===id?{...d,settled:true}:d));}
  function delDebt(id){setDebts(prev=>prev.filter(d=>d.id!==id));}
  function addGoal(){if(!goalForm.name||!goalForm.target)return;setGoals(prev=>[...prev,{id:uid(),...goalForm,target:parseFloat(goalForm.target)||0,current:parseFloat(goalForm.current)||0}]);setGoalForm({name:"",target:"",current:"",deadline:""});}
  function updGoalCur(id,val){setGoals(prev=>prev.map(g=>g.id===id?{...g,current:parseFloat(val)||0}:g));}
  function delGoal(id){setGoals(prev=>prev.filter(g=>g.id!==id));}
  const FTABS=[["overview","Overview"],["sources","Sources"],["txns","Transactions"],["subs","Subscriptions"],["debts","Debts"],["goals","Goals"],["report","Report"]];
  const totBal=sources.reduce((s,x)=>s+x.balance,0);
  const mth=today().slice(0,7);
  const mTxns=txns.filter(t=>t.date&&t.date.slice(0,7)===mth);
  const mInc=mTxns.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const mExp=mTxns.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const repTxns=txns.filter(t=>t.date&&t.date>=repFrom&&t.date<=repTo);
  const byCat={};
  repTxns.filter(t=>t.type==="expense").forEach(t=>{byCat[t.cat]=(byCat[t.cat]||0)+t.amount;});
  const catData=Object.entries(byCat).map(([name,value])=>({name,value:Math.round(value*100)/100})).sort((a,b)=>b.value-a.value);
  const PCOLS=[T.accent,T.blue,T.pink,T.orange,T.green,T.sub,T.purple,T.red];
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto"}}>
      <div style={{fontSize:20,fontWeight:800,color:T.txt,marginBottom:16}}>Finance</div>
      <div style={{display:"flex",gap:5,marginBottom:18,overflowX:"auto",paddingBottom:4}}>
        {FTABS.map(([ft,fl])=><button key={ft} onClick={()=>setFtab(ft)} style={{...S.sm,whiteSpace:"nowrap",background:ftab===ft?T.accent:"transparent",color:ftab===ft?T.btnTxt:T.sub,borderColor:ftab===ft?T.accent:T.bdr,fontWeight:ftab===ft?700:400,fontSize:11,padding:"5px 11px"}}>{fl}</button>)}
      </div>
      {ftab==="overview"&&(
        <div>
          <div style={{background:"linear-gradient(145deg,"+T.card+","+T.accent+"22)",border:"1px solid "+T.accent+"44",borderRadius:18,padding:20,marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:11,color:T.sub,letterSpacing:1,marginBottom:6}}>TOTAL BALANCE</div>
            <div style={{fontSize:34,fontWeight:800,color:T.txt}}>GBP {totBal.toFixed(2)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <div style={{...S.card,textAlign:"center",padding:14}}><div style={{fontSize:16,fontWeight:700,color:T.green}}>+{mInc.toFixed(2)}</div><div style={{fontSize:10,color:T.sub,marginTop:3}}>Month Income</div></div>
            <div style={{...S.card,textAlign:"center",padding:14}}><div style={{fontSize:16,fontWeight:700,color:T.red}}>-{mExp.toFixed(2)}</div><div style={{fontSize:10,color:T.sub,marginTop:3}}>Month Expenses</div></div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:10,letterSpacing:1}}>SOURCES</div>
            {sources.length===0&&<div style={{color:T.sub,fontSize:12}}>No sources added</div>}
            {sources.map(s=><div key={s.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid "+T.bdr}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:"50%",background:s.color||T.accent}}/><span style={{fontSize:13,color:T.txt}}>{s.name}</span></div><span style={{fontWeight:700,color:s.balance>=0?T.green:T.red,fontSize:13}}>GBP {s.balance.toFixed(2)}</span></div>)}
          </div>
        </div>
      )}
      {ftab==="sources"&&<FinanceSources T={T} S={S} mob={mob} sources={sources} setSources={setSources} setTxns={setTxns} newSrc={newSrc} setNewSrc={setNewSrc} addSrc={addSrc} delSrc={delSrc} SRC_COLORS={SRC_COLORS}/>}
      {ftab==="txns"&&(
        <div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>ADD TRANSACTION</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TYPE</div><select value={txForm.type} onChange={e=>setTxForm(p=>({...p,type:e.target.value,cat:e.target.value==="income"?"Salary":"Groceries"}))} style={S.inp}><option value="expense">Expense</option><option value="income">Income</option></select></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>AMOUNT</div><input value={txForm.amount} onChange={e=>setTxForm(p=>({...p,amount:e.target.value}))} style={S.inp} placeholder="0.00"/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>CATEGORY</div><select value={txForm.cat} onChange={e=>setTxForm(p=>({...p,cat:e.target.value}))} style={S.inp}>{(FCATS[txForm.type]||FCATS.expense).map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>SOURCE</div><select value={txForm.sourceId} onChange={e=>setTxForm(p=>({...p,sourceId:e.target.value}))} style={S.inp}><option value="">None</option>{sources.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DATE</div><input type="date" value={txForm.date} onChange={e=>setTxForm(p=>({...p,date:e.target.value}))} style={S.inp}/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NOTE</div><input value={txForm.desc} onChange={e=>setTxForm(p=>({...p,desc:e.target.value}))} style={S.inp} placeholder="optional..."/></div>
            </div>
            <button onClick={addTxn} style={S.btn}>Add</button>
          </div>
          {txns.slice(0,30).map(t=><div key={t.id} style={{...S.card,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px"}}><div><div style={{fontSize:12,fontWeight:600,color:T.txt}}>{t.cat}{t.desc?" · "+t.desc:""}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>{t.date}{t.sourceId&&sources.find(s=>s.id===t.sourceId)?" · "+sources.find(s=>s.id===t.sourceId).name:""}</div></div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:t.type==="income"?T.green:T.red,fontWeight:700,fontSize:13}}>{t.type==="income"?"+":"-"}GBP{t.amount.toFixed(2)}</span><button onClick={()=>delTxn(t)} style={{...S.sm,color:T.red,padding:"1px 7px",fontSize:11}}>x</button></div></div>)}
        </div>
      )}
      {ftab==="subs"&&(
        <div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>ADD SUBSCRIPTION</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NAME</div><input value={subForm.name} onChange={e=>setSubForm(p=>({...p,name:e.target.value}))} style={S.inp} placeholder="Netflix..."/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>AMOUNT</div><input value={subForm.amount} onChange={e=>setSubForm(p=>({...p,amount:e.target.value}))} style={S.inp} placeholder="9.99"/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DAY OF MONTH</div><input value={subForm.dayOfMonth} onChange={e=>setSubForm(p=>({...p,dayOfMonth:e.target.value}))} style={S.inp} placeholder="15"/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>SOURCE</div><select value={subForm.sourceId} onChange={e=>setSubForm(p=>({...p,sourceId:e.target.value}))} style={S.inp}><option value="">None</option>{sources.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TYPE</div><select value={subForm.subType} onChange={e=>setSubForm(p=>({...p,subType:e.target.value}))} style={S.inp}><option value="expense">Expense</option><option value="income">Income</option></select></div>
              <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:18}}><input type="checkbox" checked={subForm.autoDeduct} onChange={e=>setSubForm(p=>({...p,autoDeduct:e.target.checked}))} id="adck"/><label htmlFor="adck" style={{fontSize:12,color:T.txt,cursor:"pointer"}}>Auto-deduct</label></div>
            </div>
            <button onClick={addSub} style={S.btn}>Add</button>
          </div>
          {subs.map(s=><div key={s.id} style={{...S.card,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13,color:T.txt}}>{s.name}</div><div style={{fontSize:11,color:T.sub}}>GBP {s.amount} · Day {s.dayOfMonth} · {s.subType}{s.autoDeduct?" · Auto":""}</div></div><button onClick={()=>delSub(s.id)} style={{...S.sm,color:T.red}}>Del</button></div>)}
        </div>
      )}
      {ftab==="debts"&&(
        <div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>ADD DEBT</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>PERSON</div><input value={debtForm.person} onChange={e=>setDebtForm(p=>({...p,person:e.target.value}))} style={S.inp} placeholder="Name"/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>AMOUNT</div><input value={debtForm.amount} onChange={e=>setDebtForm(p=>({...p,amount:e.target.value}))} style={S.inp} placeholder="50"/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TYPE</div><select value={debtForm.type} onChange={e=>setDebtForm(p=>({...p,type:e.target.value}))} style={S.inp}><option value="owe_me">They owe me</option><option value="i_owe">I owe them</option></select></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DATE</div><input type="date" value={debtForm.date} onChange={e=>setDebtForm(p=>({...p,date:e.target.value}))} style={S.inp}/></div>
              <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NOTE</div><input value={debtForm.note} onChange={e=>setDebtForm(p=>({...p,note:e.target.value}))} style={S.inp} placeholder="optional..."/></div>
            </div>
            <button onClick={addDebt} style={S.btn}>Add</button>
          </div>
          {debts.filter(d=>!d.settled).map(d=>(
            <div key={d.id} style={{...S.card,marginBottom:8,borderColor:(d.type==="owe_me"?T.green:T.red)+"44"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:700,fontSize:13,color:d.type==="owe_me"?T.green:T.red}}>{d.type==="owe_me"?"+ ":"- "}{d.person}</div><div style={{fontSize:15,fontWeight:800,color:T.txt,marginTop:2}}>GBP {parseFloat(d.amount).toFixed(2)}</div>{d.note&&<div style={{fontSize:11,color:T.sub,marginTop:2}}>{d.note}</div>}</div>
                <div style={{display:"flex",gap:6}}><button onClick={()=>settleDebt(d.id)} style={{...S.sm,color:T.green,borderColor:T.green+"44",fontSize:11}}>Settle</button><button onClick={()=>delDebt(d.id)} style={{...S.sm,color:T.red,fontSize:11}}>Del</button></div>
              </div>
            </div>
          ))}
          {debts.some(d=>d.settled)&&<div style={{marginTop:12}}><div style={{fontSize:10,color:T.sub,marginBottom:6,letterSpacing:1}}>SETTLED</div>{debts.filter(d=>d.settled).map(d=><div key={d.id} style={{...S.card,marginBottom:6,opacity:0.4,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12,color:T.txt}}>{d.person} — GBP {parseFloat(d.amount).toFixed(2)}</div><button onClick={()=>delDebt(d.id)} style={{...S.sm,color:T.red,padding:"1px 7px",fontSize:11}}>x</button></div>)}</div>}
        </div>
      )}
      {ftab==="goals"&&(
        <div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>NEW SAVINGS GOAL</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>GOAL NAME</div><input value={goalForm.name} onChange={e=>setGoalForm(p=>({...p,name:e.target.value}))} style={S.inp} placeholder="New Car, Holiday..."/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TARGET (GBP)</div><input value={goalForm.target} onChange={e=>setGoalForm(p=>({...p,target:e.target.value}))} style={S.inp}/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>CURRENT (GBP)</div><input value={goalForm.current} onChange={e=>setGoalForm(p=>({...p,current:e.target.value}))} style={S.inp}/></div>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DEADLINE</div><input type="date" value={goalForm.deadline} onChange={e=>setGoalForm(p=>({...p,deadline:e.target.value}))} style={S.inp}/></div>
            </div>
            <button onClick={addGoal} style={S.btn}>Add Goal</button>
          </div>
          {goals.map(g=>{
            const pct=g.target>0?Math.min(100,Math.round(g.current/g.target*100)):0;
            return(
              <div key={g.id} style={{...S.card,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontWeight:700,fontSize:14,color:T.txt}}>{g.name}</div><button onClick={()=>delGoal(g.id)} style={{...S.sm,color:T.red,padding:"2px 8px"}}>x</button></div>
                <div style={{height:8,background:T.ib,borderRadius:4,overflow:"hidden",marginBottom:8}}><div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,"+T.accent+","+T.orange+")",borderRadius:4}}/></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.sub,marginBottom:8}}><span>GBP {g.current.toFixed(2)} / GBP {g.target.toFixed(2)}</span><span style={{color:T.accent,fontWeight:700}}>{pct}%</span></div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{fontSize:11,color:T.sub}}>Update:</div><input defaultValue={g.current} onBlur={e=>updGoalCur(g.id,e.target.value)} style={{...S.inp,width:90,padding:"5px 8px",fontSize:12}} placeholder="amount"/></div>
              </div>
            );
          })}
        </div>
      )}
      {ftab==="report"&&<FinanceReport T={T} S={S} mob={mob} repTxns={repTxns} repFrom={repFrom} setRepFrom={setRepFrom} repTo={repTo} setRepTo={setRepTo} sources={sources}/>}
    </div>
  );
}


function TodoTab({T,S,mob,calEv,setCalEv}){
  const[todos,setTodos]=useLs("fl3_todos",[]);
  const[form,setForm]=useState({title:"",date:today(),time:"",note:""});
  const[filter,setFilter]=useState("all");
  function addTodo(){
    if(!form.title)return;
    const todo={id:uid(),...form,done:false,createdAt:today()};
    setTodos(prev=>[...prev,todo]);
    if(form.date){
      setCalEv(prev=>[...prev,{id:uid(),date:form.date,title:"📌 "+form.title,time:form.time||"",note:form.note||"",cancelled:false,todoId:todo.id,color:"#5856D6"}]);
    }
    setForm({title:"",date:today(),time:"",note:""});
  }
  function toggleDone(id){setTodos(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t));}
  function delTodo(id){setTodos(prev=>prev.filter(t=>t.id!==id));setCalEv(prev=>prev.filter(e=>e.todoId!==id));}
  const filtered=todos.filter(t=>filter==="all"||filter==="done"?t.done:!t.done).sort((a,b)=>a.date.localeCompare(b.date));
  const pending=todos.filter(t=>!t.done).length;
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:T.txt}}>To-Do List</div>
          {pending>0&&<div style={{fontSize:12,color:T.sub,marginTop:2}}>{pending} pending</div>}
        </div>
      </div>
      <div style={{...S.card,marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,color:"#34C759",marginBottom:12,letterSpacing:1}}>ADD ITEM</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
          <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} style={S.inp} placeholder="What needs to be done?"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DATE</div><input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={S.inp}/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TIME (optional)</div><input type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} style={S.inp}/></div>
          </div>
          <input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} style={S.inp} placeholder="Note (optional)"/>
        </div>
        <button onClick={addTodo} disabled={!form.title} style={{...S.btn,width:"100%",background:"#34C759",opacity:form.title?1:0.4}}>Add to List + Calendar</button>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["all","All"],["pending","Pending"],["done","Done"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{...S.sm,padding:"6px 14px",background:filter===v?T.accent:T.ib,color:filter===v?T.btnTxt:T.sub,border:"none",fontWeight:filter===v?700:400}}>{l}</button>
        ))}
      </div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:"24px",color:T.sub,fontSize:13}}>No items</div>}
      {filtered.map(t=>(
        <div key={t.id} style={{...S.card,marginBottom:8,display:"flex",alignItems:"center",gap:12,opacity:t.done?0.6:1}}>
          <button onClick={()=>toggleDone(t.id)} style={{width:24,height:24,borderRadius:"50%",border:"2px solid "+(t.done?"#34C759":T.bdr),background:t.done?"#34C759":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14}}>{t.done?"✓":""}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:13,color:T.txt,textDecoration:t.done?"line-through":"none"}}>{t.title}</div>
            <div style={{fontSize:11,color:T.sub,marginTop:2}}>
              {t.date&&<span style={{color:"#5856D6"}}>{fmtDate(t.date)}</span>}
              {t.time&&<span> · {t.time}</span>}
              {t.note&&<span> · {t.note}</span>}
            </div>
          </div>
          <button onClick={()=>delTodo(t.id)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:15,color:T.red,padding:"4px"}}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

function CalendarTab({T,S,mob,calEv,setCalEv}){
  const now=new Date();
  const[year,setYear]=useState(now.getFullYear());
  const[month,setMonth]=useState(now.getMonth());
  const[selDate,setSelDate]=useState(null);
  const[evForm,setEvForm]=useState({title:"",time:"",note:"",color:""});
  const[editId,setEditId]=useState(null);
  function prevM(){if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1);}
  function nextM(){if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1);}
  const firstDay=new Date(year,month,1).getDay();
  const daysInM=new Date(year,month+1,0).getDate();
  const cells=[];
  for(let i=0;i<firstDay;i++)cells.push(null);
  for(let d=1;d<=daysInM;d++)cells.push(d);
  function dStr(d){const mo=month+1;return year+"-"+(mo<10?"0"+mo:""+mo)+"-"+(d<10?"0"+d:""+d);}
  function addEv(){if(!evForm.title||!selDate)return;if(editId){setCalEv(prev=>prev.map(e=>e.id===editId?{...e,...evForm}:e));setEditId(null);}else{setCalEv(prev=>[...prev,{id:uid(),date:selDate,...evForm,cancelled:false}]);}setEvForm({title:"",time:"",note:"",color:""});}
  function cancelEv(id){setCalEv(prev=>prev.map(e=>e.id===id?{...e,cancelled:true}:e));}
  function delEv(id){setCalEv(prev=>prev.filter(e=>e.id!==id));}
  function startEdit(ev){setEvForm({title:ev.title,time:ev.time||"",note:ev.note||"",color:ev.color||""});setEditId(ev.id);setSelDate(ev.date);}
  const MNAMES=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DNAMES=["Su","Mo","Tu","We","Th","Fr","Sa"];
  const todStr=today();
  const selEvents=selDate?calEv.filter(e=>e.date===selDate&&!e.cancelled):[];
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button onClick={prevM} style={S.sm}>Prev</button>
        <div style={{fontSize:18,fontWeight:800,color:T.txt}}>{MNAMES[month]} {year}</div>
        <button onClick={nextM} style={S.sm}>Next</button>
      </div>
      <div style={{...S.card,marginBottom:14,padding:12}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:6}}>
          {DNAMES.map(d=><div key={d} style={{textAlign:"center",fontSize:10,color:T.sub,padding:"4px 0",fontWeight:600,letterSpacing:1}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {cells.map((d,i)=>{
            const ds=d?dStr(d):"";
            const hasEv=d?calEv.some(e=>e.date===ds&&!e.cancelled):false;
            const isToday=ds===todStr;
            const isSel=ds===selDate;
            return(
              <div key={i} onClick={()=>d&&setSelDate(ds)} style={{padding:"6px 2px",textAlign:"center",borderRadius:10,cursor:d?"pointer":"default",background:isSel?T.accent:isToday?T.accent+"22":"transparent",color:isSel?T.btnTxt:T.txt,fontSize:12,fontWeight:isToday||isSel?700:400,minHeight:32,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",transition:"background 0.15s"}}>
                {d}
                {hasEv&&(
                  <div style={{width:4,height:4,borderRadius:"50%",background:isSel?T.btnTxt:((calEv.find(function(ev2){return ev2.date===ds&&!ev2.cancelled})||{}).color||T.accent),marginTop:2}}/>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {selDate&&(
        <div style={S.card}>
          <div style={{fontWeight:700,color:T.accent,marginBottom:12,fontSize:13,letterSpacing:1}}>{fmtDate(selDate).toUpperCase()}</div>
          {selEvents.map(e=>(
            <div key={e.id} style={{background:T.ib,borderRadius:12,padding:"10px 12px",marginBottom:8,border:"1px solid "+T.bdr}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{display:"flex",alignItems:"center",gap:6}}>{e.color&&<div style={{width:8,height:8,borderRadius:"50%",background:e.color,flexShrink:0}}/>}<div style={{fontWeight:600,fontSize:13,color:T.txt}}>{e.title}</div></div>{e.time&&<div style={{fontSize:11,color:e.color||T.accent,marginTop:2}}>{e.time}</div>}{e.note&&<div style={{fontSize:11,color:T.sub,marginTop:2}}>{e.note}</div>}</div>
                <div style={{display:"flex",gap:5}}><button onClick={()=>startEdit(e)} style={{...S.sm,fontSize:11,padding:"2px 7px"}}>Edit</button><button onClick={()=>cancelEv(e.id)} style={{...S.sm,color:T.orange,fontSize:11,padding:"2px 7px"}}>Cancel</button><button onClick={()=>delEv(e.id)} style={{...S.sm,color:T.red,fontSize:11,padding:"2px 7px"}}>x</button></div>
              </div>
            </div>
          ))}
          <div style={{marginTop:selEvents.length?10:0}}>
            <div style={{fontSize:10,color:T.sub,marginBottom:8,letterSpacing:1}}>{editId?"EDIT EVENT":"ADD EVENT"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <input value={evForm.title} onChange={e=>setEvForm(p=>({...p,title:e.target.value}))} style={S.inp} placeholder="Event title"/>
              <input value={evForm.time} onChange={e=>setEvForm(p=>({...p,time:e.target.value}))} style={S.inp} placeholder="Time" type="time"/>
              <input value={evForm.note} onChange={e=>setEvForm(p=>({...p,note:e.target.value}))} style={S.inp} placeholder="Note (optional)"/>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:6}}>COLOR</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{"#FF3B30,#FF9500,#34C759,#007AFF,#5856D6,#FF2D55,#AC8E68".split(",").map(c=>(<button key={c} onClick={()=>setEvForm(p=>({...p,color:c}))} style={{width:24,height:24,borderRadius:"50%",background:c,border:evForm.color===c?"3px solid "+T.txt:"2px solid transparent",cursor:"pointer"}}/>))}<button onClick={()=>setEvForm(p=>({...p,color:""}))} style={{width:24,height:24,borderRadius:"50%",background:T.ib,border:evForm.color===""?"3px solid "+T.txt:"2px solid "+T.bdr,cursor:"pointer",fontSize:9,color:T.sub}}>⊘</button></div></div>
              <div style={{display:"flex",gap:8}}><button onClick={addEv} style={S.btn}>{editId?"Save":"Add"}</button>{editId&&<button onClick={()=>{setEditId(null);setEvForm({title:"",time:"",note:"",color:"",});}} style={S.sm}>Cancel</button>}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function WorkShiftsTab({T,S,mob,calEv,setCalEv}){
  const[shifts,setShifts]=useLs("fl3_shifts",[]);
  const[form,setForm]=useState({date:today(),startTime:"09:00",endTime:"17:00",note:""});
  const[editId,setEditId]=useState(null);
  function saveShift(){
    if(!form.date||!form.startTime||!form.endTime)return;
    if(editId){
      setShifts(prev=>prev.map(s=>s.id===editId?{...s,...form}:s));
      setCalEv(prev=>prev.map(e=>e.shiftId===editId?{...e,date:form.date,time:form.startTime+" – "+form.endTime,note:form.note||""}:e));
      setEditId(null);
    } else {
      const shift={id:uid(),...form};
      setShifts(prev=>[...prev,shift]);
      setCalEv(prev=>[...prev,{id:uid(),date:form.date,title:"Work Shift",time:form.startTime+" – "+form.endTime,note:form.note||"",cancelled:false,shiftId:shift.id,color:"#30D158"}]);
    }
    setForm({date:today(),startTime:"09:00",endTime:"17:00",note:""});
  }
  function delShift(shift){setShifts(prev=>prev.filter(s=>s.id!==shift.id));setCalEv(prev=>prev.filter(e=>e.shiftId!==shift.id));}
  function startEdit(s){setForm({date:s.date,startTime:s.startTime,endTime:s.endTime,note:s.note||""});setEditId(s.id);}
  function cancelEdit(){setEditId(null);setForm({date:today(),startTime:"09:00",endTime:"17:00",note:""});}
  const sorted=[...shifts].sort((a,b)=>a.date.localeCompare(b.date));
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{fontSize:20,fontWeight:800,color:T.txt,marginBottom:20}}>Work Shifts</div>
      <div style={{...S.card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:1}}>{editId?"EDIT SHIFT":"ADD SHIFT"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DATE</div><input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={S.inp}/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>START TIME</div><input type="time" value={form.startTime} onChange={e=>setForm(p=>({...p,startTime:e.target.value}))} style={S.inp}/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>END TIME</div><input type="time" value={form.endTime} onChange={e=>setForm(p=>({...p,endTime:e.target.value}))} style={S.inp}/></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NOTE</div><input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} style={S.inp} placeholder="e.g. Morning shift, Manager on duty..."/></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={saveShift} style={{...S.btn,flex:1}}>{editId?"Save Changes":"Save Shift → Calendar"}</button>
          {editId&&<button onClick={cancelEdit} style={S.sm}>Cancel</button>}
        </div>
      </div>
      {sorted.length===0&&<div style={{textAlign:"center",padding:"30px",color:T.sub,fontSize:13}}>No shifts logged yet</div>}
      {sorted.map(s=>(
        <div key={s.id} style={{...S.card,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",borderColor:s.id===editId?T.green+"55":T.cardBorder}}>
          <div>
            <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{fmtDate(s.date)}</div>
            <div style={{fontSize:13,color:T.green,fontWeight:600,marginTop:3}}>{s.startTime} – {s.endTime}</div>
            {s.note&&<div style={{fontSize:11,color:T.sub,marginTop:2}}>{s.note}</div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>startEdit(s)} style={{...S.sm,fontSize:16,padding:"4px 8px",border:"none",background:"transparent",cursor:"pointer"}}>✏️</button>
            <button onClick={()=>delShift(s)} style={{...S.sm,fontSize:16,padding:"4px 8px",border:"none",background:"transparent",cursor:"pointer"}}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}


function VaultTab({T,S,mob}){
  const[items,setItems]=useLs("fl3_vault",[]);
  const[search,setSearch]=useState("");
  const[showAdd,setShowAdd]=useState(false);
  const[form,setForm]=useState({title:"",value:"",category:"other",note:""});
  const[visible,setVisible]=useState({});
  const[editId,setEditId]=useState(null);
  const CATS=[{v:"card",l:"💳 Card Numbers"},{v:"phone",l:"📱 Phone Numbers"},{v:"login",l:"🔑 Logins & Passwords"},{v:"other",l:"📝 Other"}];
  function saveItem(){
    if(!form.title||!form.value)return;
    if(editId){setItems(prev=>prev.map(i=>i.id===editId?{...i,...form}:i));setEditId(null);}
    else setItems(prev=>[...prev,{id:uid(),...form,date:today()}]);
    setForm({title:"",value:"",category:"other",note:""});setShowAdd(false);
  }
  function delItem(id){setItems(prev=>prev.filter(i=>i.id!==id));}
  function toggleVis(id){setVisible(p=>({...p,[id]:!p[id]}));}
  function copyVal(val){try{navigator.clipboard.writeText(val);}catch(e){}}
  function startEdit(item){setForm({title:item.title,value:item.value,category:item.category,note:item.note||""});setEditId(item.id);setShowAdd(true);}
  const filtered=items.filter(i=>!search||i.title.toLowerCase().includes(search.toLowerCase())||(i.value.toLowerCase().includes(search.toLowerCase())));
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:20,fontWeight:800,color:T.txt}}>Vault 🔐</div>
        <button onClick={()=>{setShowAdd(!showAdd);setEditId(null);setForm({title:"",value:"",category:"other",note:"",});}} style={{...S.btn,background:"#34C759",padding:"8px 16px",fontSize:13}}>+ Add</button>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} style={{...S.inp,marginBottom:14}} placeholder="Search vault..."/>
      {showAdd&&(
        <div style={{...S.card,marginBottom:14,borderColor:"#34C759",border:"1.5px solid #34C759"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#34C759",marginBottom:12,letterSpacing:1}}>{editId?"EDIT ITEM":"ADD ITEM"}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>CATEGORY</div><select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={S.inp}>{CATS.map(c=><option key={c.v} value={c.v}>{c.l}</option>)}</select></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TITLE</div><input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} style={S.inp} placeholder="e.g. Barclays Card, John Mobile..."/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>VALUE</div><input value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))} style={S.inp} placeholder="Card number, phone, password..."/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NOTE (optional)</div><input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} style={S.inp} placeholder="Additional info..."/></div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={saveItem} style={{...S.btn,flex:1,background:"#34C759"}}>{editId?"Save Changes":"Add to Vault"}</button>
            <button onClick={()=>{setShowAdd(false);setEditId(null);}} style={S.sm}>Cancel</button>
          </div>
        </div>
      )}
      {filtered.length===0&&!showAdd&&<div style={{textAlign:"center",padding:"30px",color:T.sub,fontSize:13}}>Vault is empty</div>}
      {CATS.map(cat=>{
        const cItems=filtered.filter(i=>i.category===cat.v);
        if(cItems.length===0)return null;
        return(
          <div key={cat.v} style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:8}}>{cat.l}</div>
            {cItems.map(item=>(
              <div key={item.id} style={{...S.card,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{item.title}</div>
                    <div style={{fontSize:13,color:T.txt,marginTop:4,letterSpacing:visible[item.id]?0:2,fontFamily:visible[item.id]?"inherit":"monospace",wordBreak:"break-all"}}>
                      {visible[item.id]?item.value:"••••••••••••"}
                    </div>
                    {item.note&&<div style={{fontSize:11,color:T.sub,marginTop:3}}>{item.note}</div>}
                  </div>
                  <div style={{display:"flex",gap:2,flexShrink:0}}>
                    <button onClick={()=>toggleVis(item.id)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:16,padding:"4px"}}>{visible[item.id]?"🙈":"👁️"}</button>
                    {visible[item.id]&&<button onClick={()=>copyVal(item.value)} style={{...S.sm,fontSize:10,padding:"3px 7px"}}>Copy</button>}
                    <button onClick={()=>startEdit(item)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:15,padding:"4px"}}>✏️</button>
                    <button onClick={()=>delItem(item.id)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:15,padding:"4px",color:T.red}}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function FilesTab({T,S,mob}){
  const[files,setFiles]=useLs("fl3_files",[]);
  const[search,setSearch]=useState("");
  const[showUpload,setShowUpload]=useState(false);
  const[viewFile,setViewFile]=useState(null);
  const[pendingFile,setPendingFile]=useState(null);
  const[upTitle,setUpTitle]=useState("");
  const[upDesc,setUpDesc]=useState("");
  const fileRef=useRef(null);
  function fmtSz(b){if(b<1024)return b+"B";if(b<1048576)return(b/1024).toFixed(1)+"KB";return(b/1048576).toFixed(1)+"MB";}
  function fileIcon(t){if(t.includes("pdf"))return "📄";if(t.includes("image"))return "🖼️";if(t.includes("text"))return "📝";return "📎";}
  function compressImage(dataUrl,cb){
    const img=new Image();
    img.onload=()=>{
      const MAX=1200;let w=img.width,h=img.height;
      if(w>MAX||h>MAX){if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;}}
      const c=document.createElement("canvas");c.width=w;c.height=h;
      c.getContext("2d").drawImage(img,0,0,w,h);
      cb(c.toDataURL("image/jpeg",0.75),w+"x"+h);
    };
    img.src=dataUrl;
  }
  function handleSelect(e){
    const f=e.target.files[0];if(!f)return;
    if(f.size>10*1024*1024){alert("Max 10MB");return;}
    const r=new FileReader();
    r.onload=ev=>{
      const raw=ev.target.result;
      if(f.type.startsWith("image/")){
        compressImage(raw,(compressed)=>{
          const approxSize=Math.round(compressed.length*0.75);
          setPendingFile({name:f.name,type:f.type,origSize:f.size,size:approxSize,data:compressed});
          setUpTitle(f.name.replace(/\.[^.]+$/,""));
        });
      }else{
        setPendingFile({name:f.name,type:f.type,origSize:f.size,size:f.size,data:raw});
        setUpTitle(f.name.replace(/\.[^.]+$/,""));
      }
    };
    r.readAsDataURL(f);
    e.target.value="";
  }
  function saveFile(){
    if(!pendingFile||!upTitle)return;
    setFiles(prev=>[...prev,{id:uid(),title:upTitle,desc:upDesc,name:pendingFile.name,type:pendingFile.type,size:pendingFile.size,origSize:pendingFile.origSize,data:pendingFile.data,date:today()}]);
    setPendingFile(null);setUpTitle("");setUpDesc("");setShowUpload(false);
  }
  function delFile(id){setFiles(prev=>prev.filter(f=>f.id!==id));setViewFile(null);}
  function download(file){const a=document.createElement("a");a.href=file.data;a.download=file.name;a.click();}
  function openPDF(file){const w=window.open("","_blank");w.document.write('<iframe src="'+file.data+'" style="width:100%;height:100vh;border:none"></iframe>');w.document.close();}
  const filtered=files.filter(f=>!search||f.title.toLowerCase().includes(search.toLowerCase())||(f.desc||"").toLowerCase().includes(search.toLowerCase()));
  return(
    <div style={{padding:mob?14:24,maxWidth:600,margin:"0 auto",paddingBottom:80}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:20,fontWeight:800,color:T.txt}}>Files 📁</div>
        <button onClick={()=>setShowUpload(true)} style={{...S.btn,background:"#34C759",padding:"8px 16px",fontSize:13}}>+ Add New</button>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} style={{...S.inp,marginBottom:14}} placeholder="Search files..."/>
      {filtered.length===0&&<div style={{textAlign:"center",padding:"30px",color:T.sub,fontSize:13}}>No files yet</div>}
      {filtered.map(f=>(
        <div key={f.id} onClick={()=>setViewFile(f)} style={{...S.card,marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
          {f.type.startsWith("image/")?
            <img src={f.data} style={{width:52,height:52,borderRadius:10,objectFit:"cover",flexShrink:0}}/>:
            <div style={{fontSize:32,flexShrink:0,width:52,textAlign:"center"}}>{fileIcon(f.type)}</div>
          }
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,color:T.txt}}>{f.title}</div>
            {f.desc&&<div style={{fontSize:11,color:T.sub,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.desc}</div>}
            <div style={{fontSize:10,color:T.sub,marginTop:2}}>{fmtDate(f.date)} · {fmtSz(f.size)}</div>
          </div>
          <div style={{fontSize:18,color:T.sub}}>›</div>
        </div>
      ))}
      <input type="file" ref={fileRef} onChange={handleSelect} accept="image/*,.pdf,.txt,.doc,.docx" style={{display:"none"}}/>

      {/* Upload Popup */}
      {showUpload&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:700}}>
          <div style={{...S.card,width:"100%",maxWidth:560,borderRadius:"20px 20px 0 0",padding:24,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div style={{fontSize:14,fontWeight:700,color:T.txt}}>Add New File</div>
              <button onClick={()=>{setShowUpload(false);setPendingFile(null);setUpTitle("");setUpDesc("");}} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:T.sub}}>✕</button>
            </div>
            {!pendingFile?(
              <div onClick={()=>fileRef.current&&fileRef.current.click()} style={{border:"2px dashed "+T.bdr,borderRadius:16,padding:"40px 20px",textAlign:"center",cursor:"pointer",marginBottom:16}}>
                <div style={{fontSize:36,marginBottom:8}}>📎</div>
                <div style={{fontWeight:600,color:T.txt,marginBottom:4}}>Tap to choose file</div>
                <div style={{fontSize:12,color:T.sub}}>Images, PDFs · Max 10MB</div>
              </div>
            ):(
              <div style={{background:T.ib,borderRadius:14,padding:14,marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
                {pendingFile.type.startsWith("image/")?
                  <img src={pendingFile.data} style={{width:60,height:60,borderRadius:10,objectFit:"cover"}}/>:
                  <div style={{fontSize:32}}>{fileIcon(pendingFile.type)}</div>
                }
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:T.txt}}>{pendingFile.name}</div>
                  <div style={{fontSize:11,color:T.sub}}>{fmtSz(pendingFile.size)}{pendingFile.origSize>pendingFile.size?" (compressed from "+fmtSz(pendingFile.origSize)+")":""}</div>
                </div>
              </div>
            )}
            <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>TITLE *</div><input value={upTitle} onChange={e=>setUpTitle(e.target.value)} style={S.inp} placeholder="File title..."/></div>
            <div style={{marginBottom:16}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>DESCRIPTION</div><textarea value={upDesc} onChange={e=>setUpDesc(e.target.value)} style={{...S.inp,resize:"none",height:60}} placeholder="Optional notes..."/></div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={saveFile} disabled={!pendingFile||!upTitle} style={{...S.btn,flex:1,background:"#34C759",opacity:pendingFile&&upTitle?1:0.4}}>Save File</button>
              <button onClick={()=>fileRef.current&&fileRef.current.click()} style={S.sm}>Choose File</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Popup */}
      {viewFile&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:700}}>
          <div style={{...S.card,width:"100%",maxWidth:560,borderRadius:"20px 20px 0 0",padding:24,maxHeight:"92vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:T.txt}}>{viewFile.title}</div>
              <button onClick={()=>setViewFile(null)} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:T.sub}}>✕</button>
            </div>
            {viewFile.type.startsWith("image/")&&(
              <img src={viewFile.data} style={{width:"100%",borderRadius:14,marginBottom:14,maxHeight:320,objectFit:"contain",background:T.ib}}/>
            )}
            {viewFile.desc&&<div style={{fontSize:13,color:T.sub,marginBottom:12,lineHeight:1.5}}>{viewFile.desc}</div>}
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              <span style={{background:T.ib,borderRadius:8,padding:"4px 10px",fontSize:11,color:T.sub}}>{fmtDate(viewFile.date)}</span>
              <span style={{background:T.ib,borderRadius:8,padding:"4px 10px",fontSize:11,color:T.sub}}>{fmtSz(viewFile.size)}</span>
              <span style={{background:T.ib,borderRadius:8,padding:"4px 10px",fontSize:11,color:T.sub}}>{viewFile.name}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {viewFile.type.includes("pdf")&&<button onClick={()=>openPDF(viewFile)} style={{...S.btn,width:"100%",padding:"13px"}}>Open PDF</button>}
              <button onClick={()=>download(viewFile)} style={{...S.sm,width:"100%",padding:"13px"}}>⬇ Download</button>
              <button onClick={()=>delFile(viewFile.id)} style={{...S.sm,width:"100%",padding:"13px",color:T.red,borderColor:T.red+"44"}}>Delete File</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuTab({T,S,mob,...props}){
  const lang=props.lang||"en";
  const[section,setSection]=useState(null);
  const fa=lang==="fa";
  const ITEMS=[
    {id:"training",label:fa?"تمرین":"Training",icon:"🏋️",desc:fa?"ثبت و پیگیری تمرین":"Log & track workouts",color:T.orange},
    {id:"program",label:fa?"برنامه":"Program",icon:"📋",desc:fa?"طراحی برنامه تمرینی":"Design your programs",color:T.accent},
    {id:"diet",label:fa?"رژیم":"Diet",icon:"🥗",desc:fa?"پیگیری تغذیه":"Track nutrition",color:T.green},
    {id:"health",label:fa?"سلامت":"Health",icon:"💪",desc:fa?"اندازه‌گیری بدن":"Measurements & History",color:T.blue},
    {id:"history",label:fa?"تاریخچه":"History",icon:"📊",desc:fa?"جلسات گذشته":"Past sessions & trends",color:T.pink},
    {id:"finance",label:fa?"مالی":"Finance",icon:"💰",desc:fa?"مدیریت مالی":"Manage your money",color:T.accent},
    {id:"calendar",label:fa?"تقویم":"Calendar",icon:"📅",desc:fa?"رویدادها و برنامه":"Events & schedule",color:T.blue},
    {id:"shifts",label:fa?"شیفت کاری":"Work Shifts",icon:"🗓️",desc:fa?"ثبت شیفت کاری":"Log your work schedule",color:T.blue},
    {id:"vault",label:fa?"خزانه":"Vault",icon:"🔐",desc:fa?"اطلاعات مهم":"Store sensitive info",color:T.sub},
    {id:"files",label:fa?"فایل‌ها":"Files",icon:"📁",desc:fa?"فایل‌های مهم":"Store important files",color:T.sub},
    {id:"todo",label:fa?"لیست کارها":"To-Do",icon:"✅",desc:fa?"وظایف و یادآوری":"Tasks & reminders",color:"#5856D6"},
  ];
  if(section){
    return(
      <div>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"1px solid "+T.bdr,background:T.sb,position:"sticky",top:0,zIndex:10}}>
          <button onClick={()=>setSection(null)} style={{...S.sm,padding:"6px 14px",fontSize:13}}>Back</button>
          <div style={{fontSize:16,fontWeight:800,color:T.txt}}>{ITEMS.find(i=>i.id===section).label}</div>
        </div>
        {section==="training"&&<TrainingTab T={T} S={S} mob={mob} wLogs={props.wLogs} setWLogs={props.setWLogs} programs={props.programs}/>}
        {section==="program"&&<ProgramTab T={T} S={S} mob={mob} programs={props.programs} setPrograms={props.setPrograms}/>}
        {section==="diet"&&<DietTab T={T} S={S} mob={mob} diets={props.diets} setDiets={props.setDiets} profile={props.profile} priceDb={props.priceDb}/>}
        {section==="health"&&<HealthTab T={T} S={S} mob={mob} hLog={props.hLog} setHLog={props.setHLog} profile={props.profile}/>}
        {section==="history"&&<HistoryTab T={T} S={S} mob={mob} wLogs={props.wLogs}/>}
        {section==="finance"&&<FinanceTab T={T} S={S} mob={mob} sources={props.sources} setSources={props.setSources} txns={props.txns} setTxns={props.setTxns} subs={props.subs} setSubs={props.setSubs} debts={props.debts} setDebts={props.setDebts} goals={props.goals} setGoals={props.setGoals}/>}
        {section==="calendar"&&<CalendarTab T={T} S={S} mob={mob} calEv={props.calEv} setCalEv={props.setCalEv}/>}
        {section==="shifts"&&<WorkShiftsTab T={T} S={S} mob={mob} calEv={props.calEv} setCalEv={props.setCalEv}/>}
        {section==="vault"&&<VaultTab T={T} S={S} mob={mob}/>}
        {section==="files"&&<FilesTab T={T} S={S} mob={mob}/>}
        {section==="todo"&&<TodoTab T={T} S={S} mob={mob} calEv={props.calEv} setCalEv={props.setCalEv}/>}
      </div>
    );
  }
  return(
    <div style={{padding:mob?16:28,maxWidth:600,margin:"0 auto"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:26,fontWeight:800,color:T.txt,marginBottom:4}}>Menu</div>
        <div style={{fontSize:13,color:T.sub}}>All your tools in one place</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {ITEMS.map(item=>(
          <button key={item.id} onClick={()=>setSection(item.id)} style={{background:T.card,border:"1px solid "+item.color+"33",borderRadius:18,padding:20,cursor:"pointer",textAlign:"left",fontFamily:"inherit",display:"flex",flexDirection:"column",gap:8,transition:"border-color 0.2s"}}>
            <div style={{fontSize:28}}>{item.icon}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:T.txt}}>{item.label}</div>
              <div style={{fontSize:11,color:T.sub,marginTop:3}}>{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({T,S,mob,profile,setProfile,priceDb,setPriceDb,tn,setTn,lang,setLang,onExport,onImport}){
  const[pForm,setPForm]=useState(profile);
  const[pf,setPf]=useState({name:"",baseType:"weight",baseGrams:"100",pieceName:"",cal:"",p:"",c:"",f:"",price:"",priceUnit:"kg"});
  useEffect(()=>{setPForm(profile);},[profile]);
  function saveProfile(){setProfile(pForm);}
  function genUnit(f){if(f.baseType==="piece"){const nm=f.pieceName||"piece";return f.baseGrams?"1 "+nm+" ("+f.baseGrams+"g)":"1 "+nm;}return (f.baseGrams||"100")+"g";}
  function addFood(){
    if(!pf.name)return;
    const unit=genUnit(pf);
    const priceUnit=pf.baseType==="piece"&&!pf.price?"piece":pf.priceUnit||"kg";
    setPriceDb(prev=>[...prev,{id:uid(),name:pf.name,unit,baseType:pf.baseType,baseGrams:parseFloat(pf.baseGrams)||100,pieceName:pf.pieceName,cal:parseFloat(pf.cal)||0,p:parseFloat(pf.p)||0,c:parseFloat(pf.c)||0,f:parseFloat(pf.f)||0,price:parseFloat(pf.price)||0,priceUnit}]);
    setPf({name:"",baseType:"weight",baseGrams:"100",pieceName:"",cal:"",p:"",c:"",f:"",price:"",priceUnit:"kg"});
  }
  function delFood(id){setPriceDb(prev=>prev.filter(p=>p.id!==id));}
  const W=parseFloat(pForm.weight)||75,H=parseFloat(pForm.height)||175;
  const bmiV=W/((H/100)*(H/100));
  const bhLow=(18.5*(H/100)*(H/100)).toFixed(1);
  const bhHigh=(24.9*(H/100)*(H/100)).toFixed(1);
  const nut=calcNut(pForm);
  return(
    <div style={{padding:mob?16:28,paddingBottom:100,maxWidth:600,margin:"0 auto"}}>
      <div style={{fontSize:26,fontWeight:800,color:T.txt,marginBottom:24}}>Settings</div>
      <div style={{...S.card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:1}}>APPEARANCE</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,color:T.txt}}>Theme: <span style={{color:T.accent,fontWeight:600}}>{tn==="dark"?"Dark":"Light"}</span></div>
          <button onClick={()=>setTn(tn==="dark"?"light":"dark")} style={S.btn}>{tn==="dark"?"Light Mode":"Dark Mode"}</button>
          <div style={{marginTop:16}}>
            <div style={{fontSize:11,fontWeight:700,color:T.sub,letterSpacing:1,marginBottom:10}}>LANGUAGE / زبان</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setLang("en")} style={{...S.btn,flex:1,background:lang==="en"?T.accent:T.ib,color:lang==="en"?T.btnTxt:T.sub}}>English</button>
              <button onClick={()=>setLang("fa")} style={{...S.btn,flex:1,background:lang==="fa"?T.accent:T.ib,color:lang==="fa"?T.btnTxt:T.sub,fontFamily:"'Vazirmatn','Tahoma',sans-serif"}}>فارسی</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{...S.card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:1}}>PROFILE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NAME</div><input value={pForm.name||""} onChange={e=>setPForm(p=>({...p,name:e.target.value}))} style={S.inp} placeholder="Your name"/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>AGE</div><input value={pForm.age||""} onChange={e=>setPForm(p=>({...p,age:e.target.value}))} style={S.inp} placeholder="24"/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>GENDER</div><select value={pForm.gender||"male"} onChange={e=>setPForm(p=>({...p,gender:e.target.value}))} style={S.inp}><option value="male">Male</option><option value="female">Female</option></select></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>HEIGHT (CM)</div><input value={pForm.height||""} onChange={e=>setPForm(p=>({...p,height:e.target.value}))} style={S.inp} placeholder="175"/></div>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>WEIGHT (KG)</div><input value={pForm.weight||""} onChange={e=>setPForm(p=>({...p,weight:e.target.value}))} style={S.inp} placeholder="75"/></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>ACTIVITY LEVEL</div><select value={pForm.activity||"moderate"} onChange={e=>setPForm(p=>({...p,activity:e.target.value}))} style={S.inp}>{ACT.map(a=><option key={a.v} value={a.v}>{a.l}</option>)}</select></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:T.sub,marginBottom:4}}>SPORT / DISCIPLINE</div><input value={pForm.sport||""} onChange={e=>setPForm(p=>({...p,sport:e.target.value}))} style={S.inp} placeholder="Calisthenics"/></div>
        </div>
        <button onClick={saveProfile} style={{...S.btn,width:"100%",marginBottom:14}}>Save Profile</button>
        {W&&H&&(
          <div style={{background:T.accent+"10",borderRadius:14,padding:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
              <div><div style={{fontSize:20,fontWeight:800,color:T.accent}}>{bmiV.toFixed(1)}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>BMI</div></div>
              <div><div style={{fontSize:12,fontWeight:700,color:T.txt}}>{bhLow}–{bhHigh}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>Healthy kg</div></div>
              {nut&&<div><div style={{fontSize:18,fontWeight:700,color:T.orange}}>{nut.tdee}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>TDEE kcal</div></div>}
            </div>
          </div>
        )}
      </div>
      <div style={{...S.card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:14,letterSpacing:1}}>CUSTOM FOOD DATABASE</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>
          <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>NAME</div><input value={pf.name} onChange={e=>setPf(p=>({...p,name:e.target.value}))} style={S.inp} placeholder="Tuna Can, Egg, Chicken Breast..."/></div>
          <div>
            <div style={{fontSize:10,color:T.sub,marginBottom:8}}>BASE UNIT TYPE</div>
            <div style={{display:"flex",gap:6}}>
              {[{v:"weight",l:"Per Grams"},{v:"piece",l:"Per Piece"}].map(bt=>(
                <button key={bt.v} onClick={()=>setPf(p=>({...p,baseType:bt.v,priceUnit:bt.v==="piece"?"piece":p.priceUnit==="piece"?"kg":p.priceUnit}))} style={{flex:1,padding:"9px 8px",borderRadius:10,border:"1px solid "+(pf.baseType===bt.v?T.accent:T.bdr),background:pf.baseType===bt.v?T.accent+"22":"transparent",color:pf.baseType===bt.v?T.accent:T.sub,fontSize:12,fontWeight:pf.baseType===bt.v?700:400,cursor:"pointer",fontFamily:"inherit"}}>{bt.l}</button>
              ))}
            </div>
          </div>
          {pf.baseType==="weight"?(
            <div>
              <div style={{fontSize:10,color:T.sub,marginBottom:4}}>GRAMS PER SERVING</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <input value={pf.baseGrams} onChange={e=>setPf(p=>({...p,baseGrams:e.target.value}))} style={{...S.inp,flex:1}} placeholder="100" type="number"/>
                <span style={{fontSize:13,color:T.sub}}>g</span>
              </div>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>PIECE NAME</div><input value={pf.pieceName} onChange={e=>setPf(p=>({...p,pieceName:e.target.value}))} style={S.inp} placeholder="egg, can, tomato..."/></div>
              <div>
                <div style={{fontSize:10,color:T.sub,marginBottom:4}}>GRAMS PER PIECE <span style={{color:T.sub,fontWeight:400}}>(optional)</span></div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <input value={pf.baseGrams} onChange={e=>setPf(p=>({...p,baseGrams:e.target.value}))} style={{...S.inp,flex:1}} placeholder="60" type="number"/>
                  <span style={{fontSize:12,color:T.sub}}>g</span>
                </div>
              </div>
            </div>
          )}
          <div style={{background:T.ib,borderRadius:10,padding:"8px 12px",fontSize:12,color:T.accent}}>
            Nutritional values below = per <strong>{pf.baseType==="piece"?(pf.pieceName?"1 "+(pf.pieceName||"piece")+(pf.baseGrams?" ("+pf.baseGrams+"g)":""):"1 piece"):((pf.baseGrams||"100")+"g")}</strong>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>CALORIES</div><input value={pf.cal} onChange={e=>setPf(p=>({...p,cal:e.target.value}))} style={S.inp} placeholder="78"/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>PROTEIN (G)</div><input value={pf.p} onChange={e=>setPf(p=>({...p,p:e.target.value}))} style={S.inp} placeholder="6"/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>CARBS (G)</div><input value={pf.c} onChange={e=>setPf(p=>({...p,c:e.target.value}))} style={S.inp} placeholder="0.6"/></div>
            <div><div style={{fontSize:10,color:T.sub,marginBottom:4}}>FAT (G)</div><input value={pf.f} onChange={e=>setPf(p=>({...p,f:e.target.value}))} style={S.inp} placeholder="5"/></div>
          </div>
          <div>
            <div style={{fontSize:10,color:T.sub,marginBottom:6}}>PRICE (GBP) — optional</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={pf.price} onChange={e=>setPf(p=>({...p,price:e.target.value}))} style={{...S.inp,flex:1}} placeholder="0.00"/>
              <span style={{fontSize:12,color:T.sub,whiteSpace:"nowrap"}}>per</span>
              <div style={{display:"flex",gap:4}}>
                {(pf.baseType==="piece"?["piece","kg"]:["kg","100g","g","piece"]).map(u=>(
                  <button key={u} onClick={()=>setPf(p=>({...p,priceUnit:u}))} style={{background:pf.priceUnit===u?T.accent:"transparent",color:pf.priceUnit===u?T.btnTxt:T.sub,border:"1px solid "+(pf.priceUnit===u?T.accent:T.bdr),borderRadius:7,padding:"5px 9px",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:pf.priceUnit===u?700:400}}>{u}</button>
                ))}
              </div>
            </div>
            {pf.price>0&&<div style={{marginTop:6,fontSize:11,color:T.accent,background:T.ib,borderRadius:8,padding:"5px 10px"}}>GBP {parseFloat(pf.price).toFixed(2)} / {pf.priceUnit}</div>}
          </div>
        </div>
        <button onClick={addFood} style={S.btn}>Add Food</button>
        {priceDb.length>0&&(
          <div style={{marginTop:12}}>
            {priceDb.map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid "+T.bdr}}>
                <div>
                  <div style={{fontWeight:600,fontSize:13,color:T.txt}}>{p.name} <span style={{color:T.sub,fontWeight:400,fontSize:11}}>({p.unit})</span></div>
                  <div style={{color:T.sub,fontSize:11,marginTop:2}}>{p.cal}kcal · P:{p.p} C:{p.c} F:{p.f}</div>
                  {p.price>0&&<div style={{color:T.accent,fontSize:11,marginTop:2,fontWeight:600}}>GBP {parseFloat(p.price).toFixed(2)} / {p.priceUnit||"kg"}</div>}
                </div>
                <button onClick={()=>delFood(p.id)} style={{...S.sm,color:T.red,padding:"2px 8px",fontSize:11}}>x</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={S.card}>
        <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:12,letterSpacing:1}}>DATA</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={onExport} style={S.btn}>Export JSON</button>
          <button onClick={onImport} style={{...S.sm,fontSize:12,padding:"8px 16px"}}>Import JSON</button>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[tn,setTn]=useLs("fl_theme","dark");
  const[lang,setLang]=useLs("fl_lang","en");
  const T=tn==="dark"?DARK:LIGHT;
  const S=mkS(T);
  const[tab,setTab]=useState("home");
  const mob=useMob();
  const[programs,setPrograms]=useLs("fl3_programs",[]);
  const[wLogs,setWLogs]=useLs("fl3_wlogs",[]);
  const[diets,setDiets]=useLs("fl3_diets",[]);
  const[hLog,setHLog]=useLs("fl3_health",[]);
  const[calEv,setCalEv]=useLs("fl3_events",[]);
  const[sources,setSources]=useLs("fl3_sources",[]);
  const[txns,setTxns]=useLs("fl3_txns",[]);
  const[subs,setSubs]=useLs("fl3_subs",[]);
  const[debts,setDebts]=useLs("fl3_debts",[]);
  const[goals,setGoals]=useLs("fl3_goals",[]);
  const[priceDb,setPriceDb]=useLs("fl3_prices",[]);
  const[profile,setProfile]=useLs("fl3_profile",{name:"",age:"",height:"",weight:"",gender:"male",activity:"very",sport:"Calisthenics"});
  const impRef=useRef(null);
  const autoRan=useRef(false);
  useEffect(()=>{
    if(autoRan.current)return;autoRan.current=true;
    const now=new Date();const cm=now.toISOString().slice(0,7);const dd=now.getDate();
    let changed=false;const newTxns=[];let newSrc=sources.slice();
    const newSubs=subs.map(sub=>{
      if(sub.autoDeduct&&sub.lastProcessed!==cm&&dd>=sub.dayOfMonth){
        changed=true;
        newTxns.push({id:uid(),type:sub.subType||"expense",amount:sub.amount,sourceId:sub.sourceId,cat:sub.name,desc:"Auto: "+sub.name,date:now.toISOString().slice(0,10)});
        if(sub.sourceId){newSrc=newSrc.map(src=>{if(src.id!==sub.sourceId)return src;const d=(sub.subType==="income")?sub.amount:-sub.amount;return{...src,balance:Math.round((src.balance+d)*100)/100};});}
        return{...sub,lastProcessed:cm};
      }
      return sub;
    });
    if(changed){setSubs(newSubs);setSources(newSrc);setTxns(p=>newTxns.concat(p));}
  },[]);
  function expAll(){const d=JSON.stringify({programs,wLogs,diets,hLog,calEv,sources,txns,subs,debts,goals,priceDb,profile},null,2);const url=URL.createObjectURL(new Blob([d],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="fitlife-backup.json";a.click();}
  function impAll(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.programs)setPrograms(d.programs);if(d.wLogs)setWLogs(d.wLogs);if(d.diets)setDiets(d.diets);if(d.hLog)setHLog(d.hLog);if(d.calEv)setCalEv(d.calEv);if(d.sources)setSources(d.sources);if(d.txns)setTxns(d.txns);if(d.subs)setSubs(d.subs);if(d.debts)setDebts(d.debts);if(d.goals)setGoals(d.goals);if(d.priceDb)setPriceDb(d.priceDb);if(d.profile)setProfile(d.profile);alert("Imported!");}catch(err){alert("Invalid file.");}};r.readAsText(f);e.target.value="";}
  const allProps={T,S,mob,lang,setLang,programs,setPrograms,wLogs,setWLogs,diets,setDiets,hLog,setHLog,calEv,setCalEv,sources,setSources,txns,setTxns,subs,setSubs,debts,setDebts,goals,setGoals,priceDb,setPriceDb,profile,setProfile};
  const TABS=[{id:"home",icon:"⌂",label:lang==="fa"?"داشبورد":"Dashboard"},{id:"menu",icon:"⊞",label:lang==="fa"?"منو":"Menu"},{id:"settings",icon:"⚙",label:lang==="fa"?"تنظیمات":"Settings"}];
  useEffect(()=>{
    const l=document.createElement("link");
    l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap";
    document.head.appendChild(l);
  },[]);
  return(
    <div dir={lang==="fa"?"rtl":"ltr"} style={{display:"flex",flexDirection:"column",height:"100vh",background:T.bg,color:T.txt,fontFamily:lang==="fa"?"'Vazirmatn','Tahoma',sans-serif":"'DM Sans','Sora','Segoe UI',sans-serif",overflow:"hidden"}}>
      <div style={{flex:1,overflowY:"auto",paddingBottom:100}}>
        {tab==="home"&&<DashTab {...allProps}/>}
        {tab==="menu"&&<MenuTab {...allProps}/>}
        {tab==="settings"&&<SettingsTab {...allProps} tn={tn} setTn={setTn} lang={lang} setLang={setLang} onExport={expAll} onImport={()=>impRef.current&&impRef.current.click()}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,pointerEvents:"none",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
        <div style={{maxWidth:500,margin:"0 auto",padding:"0 16px 16px",pointerEvents:"none"}}>
          <div style={{background:tn==="dark"?"#1E1E18":"#1C1C1E",borderRadius:28,boxShadow:"0 4px 28px rgba(0,0,0,0.28)",display:"flex",pointerEvents:"auto",overflow:"hidden"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 6px 12px",background:tab===t.id?"rgba(201,168,76,0.15)":"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"background 0.2s"}}>
                <div style={{fontSize:22,color:tab===t.id?T.accent:"rgba(255,255,255,0.45)",transition:"color 0.2s"}}>{t.icon}</div>
                <div style={{fontSize:9,fontWeight:tab===t.id?700:400,color:tab===t.id?T.accent:"rgba(255,255,255,0.45)",letterSpacing:0.5,textTransform:"uppercase"}}>{t.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <input type="file" accept=".json" ref={impRef} onChange={impAll} style={{display:"none"}}/>
    </div>
  );
}
