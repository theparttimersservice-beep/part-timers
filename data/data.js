/**
 * THE PART-TIMERS — Master Data Store
 * Workers, Vendors, Products, Orders, Ratings
 */

const PT_DATA = {

  workers: [
    { id:"w1",  name:"Rabindra Nayak",    odia:"ରବୀ. ନ.",  village:"Kendrapara",  district:"Kendrapara", category:"farming",     subcat:"Tractor Operator",       price:800,  unit:"hr",    rating:4.8, reviews:124, trust:92, badge:"Popular",    verified:true,  phone:"98XXXXXX01", radius:10, emoji:"🚜", desc:"8 years experience in tractor plowing, harvesting & transportation. Available 5 AM - 7 PM.",          tags:["tractor","plowing","harvesting"] },
    { id:"w2",  name:"Sushanta Behera",   odia:"ସୁ. ବ.",   village:"Aul",         district:"Kendrapara", category:"farming",     subcat:"Farm Labourer",          price:300,  unit:"day",   rating:4.6, reviews:87,  trust:85, badge:"Trusted",    verified:true,  phone:"98XXXXXX02", radius:5,  emoji:"🌾", desc:"Expert in rice transplanting, weeding, and seasonal farm labour.",                                    tags:["labourer","rice","harvest"] },
    { id:"w3",  name:"Priya Das",         odia:"ପ. ଦ.",    village:"Bhubaneswar", district:"Khordha",    category:"technician",  subcat:"Electrician",            price:400,  unit:"visit", rating:4.9, reviews:203, trust:96, badge:"Top Rated",  verified:true,  phone:"98XXXXXX03", radius:15, emoji:"⚡", desc:"Certified electrician. Wiring, motor repair, inverter, solar. 24/7 emergency service.",              tags:["electric","wiring","solar","inverter"] },
    { id:"w4",  name:"Manoj Patel",       odia:"ମ. ପ.",    village:"Cuttack",     district:"Cuttack",    category:"technician",  subcat:"Plumber",                price:350,  unit:"visit", rating:4.7, reviews:156, trust:88, badge:"Verified",   verified:true,  phone:"98XXXXXX04", radius:10, emoji:"🔧", desc:"Expert plumber. Domestic & commercial. Pipe fitting, borewell repair, bathroom.",                    tags:["plumber","pipe","borewell"] },
    { id:"w5",  name:"Suresh Sahoo",      odia:"ସୁ. ସ.",   village:"Jagatsinghpur",district:"Jagatsinghpur",category:"fish",    subcat:"Fish Farm Worker",       price:280,  unit:"day",   rating:4.5, reviews:64,  trust:80, badge:"Local",      verified:true,  phone:"98XXXXXX05", radius:8,  emoji:"🐟", desc:"Pond management, fish feeding, harvesting, aquaculture maintenance expert.",                          tags:["fish","pond","aquaculture"] },
    { id:"w6",  name:"Anita Mohanty",     odia:"ଅ. ମ.",    village:"Puri",        district:"Puri",       category:"poultry",     subcat:"Poultry Worker",         price:250,  unit:"day",   rating:4.4, reviews:41,  trust:78, badge:"Local",      verified:false, phone:"98XXXXXX06", radius:6,  emoji:"🐓", desc:"Poultry farm worker. Hen/duck farming, egg collection, vaccination assistance.",                      tags:["poultry","hen","egg","vaccination"] },
    { id:"w7",  name:"Kavita Nanda",      odia:"କ. ନ.",    village:"Bhubaneswar", district:"Khordha",    category:"learning",    subcat:"Math & Science Tutor",   price:500,  unit:"month", rating:4.9, reviews:189, trust:94, badge:"Top Rated",  verified:true,  phone:"98XXXXXX07", radius:5,  emoji:"📚", desc:"BSc graduate. Class 6-10 Math, Science, English. Online & home tuition. 100+ students taught.",       tags:["tutor","math","science","english"] },
    { id:"w8",  name:"Prakash Dash",      odia:"ପ. ଦ.",    village:"Puri",        district:"Puri",       category:"learning",    subcat:"Music Teacher",          price:800,  unit:"month", rating:4.8, reviews:67,  trust:91, badge:"Certified",  verified:true,  phone:"98XXXXXX08", radius:10, emoji:"🎵", desc:"Harmonium & tabla teacher. 15 years experience. Classical Odissi music for all ages.",                tags:["music","harmonium","tabla","dance"] },
    { id:"w9",  name:"Dipak Jena",        odia:"ଦ. ଜ.",    village:"Kendrapara",  district:"Kendrapara", category:"contractor",  subcat:"Local Contractor",       price:1500, unit:"day",   rating:4.3, reviews:78,  trust:82, badge:"Local",      verified:false, phone:"98XXXXXX09", radius:20, emoji:"🏗️", desc:"Home construction, renovation, tiles, plastering. 10 years experience in Kendrapara.",                tags:["construction","renovation","tiles"] },
    { id:"w10", name:"Rohit Kumar",       odia:"ର. କ.",    village:"Bhubaneswar", district:"Khordha",    category:"contractor",  subcat:"Verified Contractor",    price:2500, unit:"day",   rating:4.8, reviews:312, trust:95, badge:"Verified Pro",verified:true, phone:"98XXXXXX10", radius:30, emoji:"🏢", desc:"Licensed civil contractor. 50+ completed projects. Residential & commercial construction.",           tags:["contractor","civil","licensed"] },
    { id:"w11", name:"Sanjay Mishra",     odia:"ସ. ମ.",    village:"Cuttack",     district:"Cuttack",    category:"vehicle",     subcat:"Auto Driver",            price:15,   unit:"km",    rating:4.6, reviews:234, trust:90, badge:"Trusted",    verified:true,  phone:"98XXXXXX11", radius:25, emoji:"🛺", desc:"Auto-rickshaw. Village transport, market trips, outstation travel.",                                  tags:["auto","transport","rickshaw"] },
    { id:"w12", name:"Bijay Pradhan",     odia:"ବ. ପ.",    village:"Balasore",    district:"Balasore",   category:"vehicle",     subcat:"Pickup Truck",           price:12,   unit:"km",    rating:4.7, reviews:98,  trust:87, badge:"Verified",   verified:true,  phone:"98XXXXXX12", radius:40, emoji:"🚚", desc:"Pickup truck for goods transport, shifting, agricultural produce delivery.",                          tags:["truck","goods","shifting"] },
    { id:"w13", name:"Raju Nanda",        odia:"ର. ନ.",    village:"Bhubaneswar", district:"Khordha",    category:"technician",  subcat:"AC & Refrigeration",     price:500,  unit:"visit", rating:4.8, reviews:94,  trust:90, badge:"Certified",  verified:true,  phone:"98XXXXXX13", radius:20, emoji:"❄️", desc:"AC install, service, gas refill. Fridge repair. All brands. Same-day available.",                    tags:["ac","refrigeration","fridge"] },
    { id:"w14", name:"Sonu Pradhan",      odia:"ସ. ପ.",    village:"Kendrapara",  district:"Kendrapara", category:"technician",  subcat:"Mobile Repair",          price:200,  unit:"visit", rating:4.5, reviews:178, trust:82, badge:"Local",      verified:false, phone:"98XXXXXX14", radius:5,  emoji:"📱", desc:"All brand mobile repair. Screen, battery, charging port, software. 1 year warranty.",                 tags:["mobile","phone","screen","repair"] },
    { id:"w15", name:"Bikash Swain",      odia:"ବ. ସ.",    village:"Berhampur",   district:"Ganjam",     category:"fish",        subcat:"Aquaculture Specialist", price:350,  unit:"day",   rating:4.7, reviews:39,  trust:85, badge:"Verified",   verified:true,  phone:"98XXXXXX15", radius:18, emoji:"🦐", desc:"Shrimp, prawn & fish pond management. Disease treatment. Certified aquaculture worker.",              tags:["aquaculture","shrimp","prawn","pond"] },
    { id:"w16", name:"Deepak Mishra",     odia:"ଦ. ମ.",    village:"Sambalpur",   district:"Sambalpur",  category:"poultry",     subcat:"Poultry Care Expert",    price:400,  unit:"day",   rating:4.6, reviews:22,  trust:80, badge:"Trusted",    verified:false, phone:"98XXXXXX16", radius:12, emoji:"🐔", desc:"Layer hen, broiler, duck, country chicken care. Feed management & health.",                           tags:["poultry","broiler","hen","layer"] },
    { id:"w17", name:"Pradip Rout",       odia:"ପ. ର.",    village:"Puri",        district:"Puri",       category:"farming",     subcat:"Combine Harvester Op.",  price:1200, unit:"day",   rating:4.9, reviews:38,  trust:94, badge:"Top Rated",  verified:true,  phone:"98XXXXXX17", radius:25, emoji:"🚜", desc:"Combine harvester operator. Fast paddy harvesting. Covers large farms quickly.",                      tags:["harvester","combine","paddy"] },
    { id:"w18", name:"Sudhir Mallick",    odia:"ସ. ମ.",    village:"Cuttack",     district:"Cuttack",    category:"farming",     subcat:"Irrigation Technician",  price:450,  unit:"day",   rating:4.7, reviews:43,  trust:83, badge:"Verified",   verified:true,  phone:"98XXXXXX18", radius:12, emoji:"💧", desc:"Drip irrigation, sprinkler setup, canal water management. Solar pump expert.",                        tags:["irrigation","drip","sprinkler","pump"] },
  ],

  equipment: [
    { id:"e1", name:"Mahindra 35HP Tractor", village:"Kendrapara", price:800,  unit:"hr",  rating:4.8, reviews:87, emoji:"🚜", desc:"Well-maintained tractor. Plowing, seeding, harvesting.",      owner:"Ramesh Sahu",   available:true },
    { id:"e2", name:"Power Tiller",          village:"Aul",        price:350,  unit:"hr",  rating:4.6, reviews:54, emoji:"⚙️", desc:"Compact power tiller for small farms & gardens.",              owner:"Binod Kar",     available:true },
    { id:"e3", name:"Rice Threshing Machine",village:"Bhubaneswar",price:600,  unit:"day", rating:4.7, reviews:43, emoji:"🌾", desc:"High-capacity electric thresher for rice & wheat.",            owner:"Sunil Das",     available:true },
    { id:"e4", name:"Water Pump 3HP",        village:"Cuttack",    price:200,  unit:"day", rating:4.5, reviews:76, emoji:"💧", desc:"Diesel irrigation pump. 3HP capacity.",                        owner:"Pratap Barik",  available:true },
    { id:"e5", name:"Mini Excavator (JCB)",  village:"Bhubaneswar",price:3500, unit:"day", rating:4.9, reviews:32, emoji:"🏗️", desc:"Small excavator for pond digging, foundation, levelling.",     owner:"Modern Tools",  available:false},
    { id:"e6", name:"Concrete Mixer",        village:"Puri",       price:500,  unit:"day", rating:4.6, reviews:28, emoji:"🔩", desc:"Electric concrete mixer for construction projects.",           owner:"Raja Cement",   available:true },
    { id:"e7", name:"Sprayer Machine",       village:"Kendrapara", price:150,  unit:"day", rating:4.4, reviews:61, emoji:"🌿", desc:"Pesticide and fertilizer sprayer for large fields.",           owner:"Green Farm",    available:true },
  ],

  vendors: [
    { id:"v1", name:"Amma Kitchen",             village:"Kendrapara", category:"instant",    emoji:"🍛", rating:4.8, reviews:234, badge:"Popular",  plan:"district", img:"🍛", desc:"Authentic Odia home-cooked food daily.",    verified:true,  products:["Dalma Thali","Fish Curry Thali","Pakhala Bhata","Chhena Poda"] },
    { id:"v2", name:"Green Harvest Vegetables", village:"Aul",         category:"vegetables", emoji:"🥦", rating:4.9, reviews:312, badge:"Fresh",    plan:"block",    img:"🥦", desc:"Farm-fresh vegetables every morning.",      verified:true,  products:["Tomato","Potato","Brinjal","Spinach","Onion"] },
    { id:"v3", name:"Jagannath Grocery",        village:"Puri",        category:"grocery",    emoji:"🛒", rating:4.7, reviews:178, badge:"Trusted",  plan:"plus",     img:"🛒", desc:"All grocery items. Village delivery.",      verified:true,  products:["Rice","Dal","Mustard Oil","Spices","Flour"] },
    { id:"v4", name:"Morning Dew Organic",      village:"Cuttack",     category:"vegetables", emoji:"🌽", rating:4.6, reviews:89,  badge:"Organic",  plan:"block",    img:"🌽", desc:"Certified organic. No pesticides.",          verified:true,  products:["Organic Spinach","Organic Brinjal","Organic Tomato"] },
    { id:"v5", name:"Village Fast Food",        village:"Berhampur",   category:"instant",    emoji:"🍲", rating:4.5, reviews:67,  badge:"Local",    plan:"mini",     img:"🍲", desc:"Local Odia snacks & fast food.",            verified:false, products:["Pakoda","Chhuda Ghuguni","Dahi Bara"] },
  ],

  marketplace: [
    { id:"m1", title:"Honda Shine 2019",          price:42000,  village:"Cuttack",     category:"vehicles",    emoji:"🏍️", desc:"40k km, single owner, docs clear." },
    { id:"m2", title:"Samsung TV 32\" Smart",     price:8500,   village:"Bhubaneswar", category:"electronics", emoji:"📺", desc:"3 yr old, perfect condition." },
    { id:"m3", title:"Paddy Land 2 Acre (Lease)", price:12000,  village:"Kendrapara",  category:"land",        emoji:"🌾", desc:"Near river. Irrigation available. Per season." },
    { id:"m4", title:"Goat Pair (M+F)",           price:8000,   village:"Aul",         category:"animals",     emoji:"🐐", desc:"Black Bengal, vaccinated, 2 yr." },
    { id:"m5", title:"Welding Machine 200A",      price:6000,   village:"Puri",        category:"tools",       emoji:"🔧", desc:"Arc welder, barely used, with rods." },
    { id:"m6", title:"Study Table & Chair",       price:1800,   village:"Berhampur",   category:"furniture",   emoji:"🪑", desc:"Solid wood, minor scratches." },
    { id:"m7", title:"Paddy 10 Quintal",          price:18500,  village:"Kendrapara",  category:"crops",       emoji:"🌾", desc:"HMT variety, fresh harvest." },
    { id:"m8", title:"Electric Sewing Machine",   price:4500,   village:"Sambalpur",   category:"electronics", emoji:"🪡", desc:"Usha brand, 2 years old." },
  ],

  haata: [
    { id:"h1", name:"Fresh Pomfret Fish",    price:280, unit:"kg",  vendor:"Sukanta Fish",    village:"Rajnagar",   emoji:"🐠", qty:50,  category:"fish" },
    { id:"h2", name:"Organic Turmeric",      price:180, unit:"kg",  vendor:"Priya Spices",    village:"Kendrapara", emoji:"🌿", qty:20,  category:"spices" },
    { id:"h3", name:"Handloom Saree",        price:1200,unit:"pc",  vendor:"Meera Weaves",    village:"Nuapatna",   emoji:"👘", qty:15,  category:"clothing" },
    { id:"h4", name:"Desi Chicken",          price:350, unit:"kg",  vendor:"Ram Poultry",     village:"Aul",        emoji:"🐔", qty:0,   category:"poultry" },
    { id:"h5", name:"Forest Honey",          price:500, unit:"kg",  vendor:"Tribal Co-op",    village:"Mayurbhanj", emoji:"🍯", qty:10,  category:"food" },
    { id:"h6", name:"Banana Bunch",          price:80,  unit:"bunch",vendor:"Sanjay Farm",    village:"Cuttack",    emoji:"🍌", qty:100, category:"food" },
    { id:"h7", name:"Earthen Pot Set",       price:120, unit:"set", vendor:"Kumhar Ghar",     village:"Puri",       emoji:"🏺", qty:30,  category:"handicraft" },
    { id:"h8", name:"Bamboo Basket",         price:90,  unit:"pc",  vendor:"Tribal Art",      village:"Koraput",    emoji:"🧺", qty:50,  category:"handicraft" },
    { id:"h9", name:"Neem Stick Bundle",     price:30,  unit:"bundle",vendor:"Herbal Village",village:"Sambalpur",  emoji:"🌱", qty:200, category:"herbs" },
    { id:"h10",name:"Mahua Flower Dry",      price:60,  unit:"kg",  vendor:"Forest Harvest",  village:"Rayagada",   emoji:"🌸", qty:15,  category:"herbs" },
  ],

  villages: ["Bhubaneswar","Cuttack","Kendrapara","Aul","Rajnagar","Puri","Berhampur","Sambalpur","Baripada","Rourkela","Balasore","Dhenkanal","Angul","Jajpur","Koraput","Mayurbhanj","Jagatsinghpur","Jeypore","Sundargarh","Ganjam","Rayagada","Nuapatna","Paradeep","Paradip","Bhadrak","Keonjhar","Phulbani","Bolangir","Bargarh"],

  reviews: [
    { worker:"w1", user:"Prakash Sahu",  rating:5, text:"Excellent! Came on time, very professional.",     date:"2025-07-10" },
    { worker:"w1", user:"Sunita Devi",   rating:5, text:"Best tractor service. Will book again.",          date:"2025-07-08" },
    { worker:"w3", user:"Rajan Panda",   rating:5, text:"Fixed wiring quickly, very knowledgeable.",       date:"2025-07-12" },
    { worker:"w7", user:"Priya Sharma",  rating:5, text:"Kavita is an amazing tutor. My son got 95%!",     date:"2025-07-05" },
  ],

};

window.PT_DATA = PT_DATA;
