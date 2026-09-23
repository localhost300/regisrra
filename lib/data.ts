export type Advisor={
slug:string;
name:string;
firstName:string;
lastName:string;
initials:string;
title:string;
firm:string;
firmCrd:string;
crd:string;
streetAddress:string;
city:string;
region:string;
postalCode:string;
location:string;
specialties:string[];
services:string[];
years:number;
firms:number;
stateLicenses:number;
finraRegistrations:number;
sroRegistrations:number;
disclosures:number;
exams:number;
registrationSince:string;
rating:number;
reviews:number;
bio:string;
fee:string;
minimum:string;
fiduciary:boolean;
verified:boolean;
contactEnabled:boolean;
contactEmail:string;
};


export const advisors:Advisor[]=[

{

slug:'leon-arthur-dean',
name:'Leon Arthur Dean',
firstName:'Leon',
lastName:'Dean',
initials:'LD',

title:'Registered Broker',
firm:'Morgan Stanley & Co. LLC',
firmCrd:'8209',
crd:'5121340',

streetAddress:'1585 Broadway',
city:'New York',
region:'NY',
postalCode:'10036',

location:'New York, NY',

specialties:[
'Securities Trading',
'Brokerage Services'
],

services:[
'Securities Trading',
'Brokerage Services',
'General Securities'
],

years:18,
firms:3,
stateLicenses:53,
finraRegistrations:3,
sroRegistrations:29,
disclosures:0,
exams:6,
registrationSince:'2008',
rating:0,
reviews:0,

bio:'Leon Arthur Dean is a New York-based registered broker with Morgan Stanley & Co. LLC. FINRA BrokerCheck reports 18 years of industry experience, registrations in 53 U.S. states and territories, and no disclosure events. Registration information is sourced from FINRA BrokerCheck, CRD 5121340.',

fee:'Contact firm for details',
minimum:'Contact firm for details',

fiduciary:false,
verified:true,
contactEnabled:true,

contactEmail:'info@advisorregistry.wiki'

}

];


export const specialties=[
'Retirement Planning',
'Investment Management',
'Tax Planning',
'Wealth Management',
'Estate Planning',
'College Planning',
'Equity Compensation',
'Business Owners',
'Insurance Planning',
'Family Wealth'
];


export const guides=[

{
slug:'a-calmer-way-to-plan-retirement',
category:'Retirement',
title:'A calmer way to plan for retirement',
excerpt:'Turn a distant ambition into a series of confident, measurable decisions.',
time:'7 min read',
date:'Aug 28, 2026'
},

{
slug:'understanding-advisory-fees',
category:'Personal Finance',
title:'How financial advisor fees actually work',
excerpt:'A plain-language guide to retainers, flat fees, commissions, and AUM pricing.',
time:'6 min read',
date:'Aug 19, 2026'
},

{
slug:'tax-smart-investing',
category:'Taxes',
title:'The principles of tax-smart investing',
excerpt:'Simple moves that can make your portfolio more efficient over time.',
time:'8 min read',
date:'Aug 8, 2026'
},

{
slug:'estate-plan-checklist',
category:'Estate Planning',
title:'An estate plan you can understand',
excerpt:'The core documents and conversations that help protect the people you love.',
time:'9 min read',
date:'Jul 30, 2026'
},

{
slug:'market-volatility',
category:'Investing',
title:'What to do when markets feel uncertain',
excerpt:'A disciplined framework for separating useful action from costly reaction.',
time:'5 min read',
date:'Jul 22, 2026'
},

{
slug:'equity-compensation',
category:'Wealth Management',
title:'Making sense of equity compensation',
excerpt:'A starting point for options, vesting schedules, concentration, and taxes.',
time:'10 min read',
date:'Jul 14, 2026'
}

];


export const reviews=[

{id:1,name:'Rachel Whitmore',rating:5,date:'August 2026',body:'The site made it much easier to understand what different advisors actually specialize in. I appreciated how clearly the information was organized.'},

{id:2,name:'Daniel Foster',rating:5,date:'August 2026',body:'I had been putting off my search because it felt overwhelming. Advisor Registry gave me a sensible place to start and helped me focus on the right questions.'},

{id:3,name:'Priya Nair',rating:5,date:'July 2026',body:'The experience felt calm and straightforward. I could compare expertise and working styles without feeling pushed toward a quick decision.'},

{id:4,name:'Marcus Ellington',rating:4,date:'July 2026',body:'The guides were genuinely useful, especially the explanation of fee structures. I felt better prepared before beginning any conversations.'},

{id:5,name:'Elena Rodriguez',rating:5,date:'June 2026',body:'Everything was written in plain language. It helped my partner and me talk through what we wanted from an advisor before reaching out.'},

{id:6,name:'Jonathan Mercer',rating:5,date:'June 2026',body:'A polished and thoughtful resource. The search process focused on fit and experience rather than overwhelming me with financial jargon.'},

{id:7,name:'Amina Bello',rating:5,date:'May 2026',body:'I liked being able to think through my priorities first. The matching questions surfaced details I had not considered on my own.'},

{id:8,name:'Samuel Hart',rating:4,date:'May 2026',body:'Simple to navigate and refreshingly transparent. I would like to see more advisor profiles as the registry grows.'},

{id:9,name:'Claire Donovan',rating:5,date:'April 2026',body:'The overall experience felt considered and trustworthy. It gave me confidence that I could make a more informed choice.'}

];
