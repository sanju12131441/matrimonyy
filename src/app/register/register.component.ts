import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { startWith, map, sample } from 'rxjs/operators';
import { AuthService } from '../../app/Services/auth.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
export interface StateGroup {
  letter: string;
  names: string[];
}
export interface hd {
  group: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  dateofBirth: '';
  startDate = new Date(2018, 0, 1);
  birthdayValid: Boolean;
  AccountDetails: FormGroup;
  secondFormGroup: FormGroup;
  EducationDetails: FormGroup;
  FamilyDetails: FormGroup;
  stateForm: FormGroup;
  Caste: Boolean = false;
  AllCastes: Boolean = false;
  HoroScopes: Boolean = false;
  Mangaliks: Boolean = false;
  S = false;
  Advertise = true;
  HigherEducation: hd[] = [{
    group: 'Engineering Design',
    names: ["B.E\/B.Tech", "B.Pharma", "M.E\/M.Tech", "M.Pharma", "M.S. Engineering", "B.Arch", "M.Arch", "B.Des", "M.Des"]
  }, {
    group: 'Computers',
    names: ["MCA\/PGDCA", "BCA", "B.IT"]
  }, {
    group: 'Finance',
    names: ["B.Com", "CA", "CS", "ICWA", "M.Com", "CFA"]
  }, {
    group: 'Managment',
    names: ["MBA\/PGDM", "BBA", "BHM"]
  },
  {
    group: 'Medicine',
    names: ["MBBS", "M.D.", "BAMS", "BHMS", "BDS", "M.S. (Medicine)", "MVSc.", "BvSc.", "MDS", "BPT", "MPT", "DM", "MCh"]
  },
  {
    group: 'Law',
    names: ["BL\/LLB", "ML\/LLM"]
  },
  {
    group: 'Arts\/Science"',
    names: ["B.A", "B.Sc.", "M.A.", "M.Sc.", "B.Ed", "M.Ed", "MSW", "BFA", "MFA", "BJMC", "MJMC"]
  },
  {
    group: 'Doctorate',
    names: ["Ph.D", "M.Phil"]
  },
  {
    group: 'Non Graduate',
    names: ["Diploma", "High School", "Trade School", "Other"]
  }];
  stateGroups: StateGroup[] = [{
    letter: 'North',
    names: ["Hindi-Delhi",
      "Hindi-MP",
      "Hindi-UP",
      "Punjabi",
      "Bihari",
      "Rajasthani/Marwari",
      "Haryanvi",
      "Himachali",
      "Kashmiri",
      "Sindhi", "Urdu"]
  }, {
    letter: 'East',
    names: ["Bengali", "Oriya", "Assamese", "Sikkim/ Nepali"]
  }, {
    letter: 'South',
    names: ["Tamil",
      "Telugu",
      "Kannada",
      "Malayalam",
      "Tulu",
      "Urdu"]
  }, {
    letter: 'West',
    names: ["Marathi",
      "Gujarati / Kutchi",
      "Hindi-MP",
      "Konkani",
      "Sindhi"]
  }, {
    letter: 'Others',
    names: ['English']
  }];
  Religions: string[] = ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Buddhist', 'Jain', 'Parsi', 'Jewish', 'Bahai'];
  MaritalStaus: string[] = ['Never Married', 'Awiting Divorce', 'Divorced', 'Widowed', 'Anulled'];
  Occupation: string[] = ['Private Company', 'Business/Self Employed', 'Government Job', 'Doctor', 'Teacher', 'Not Working'];
  AnnualIncome: any[] = ['No Income', 'Rs 0-1 Lakh', 'Rs 1-2 Lakh', 'Rs 2-3 Lakh', 'Rs 3-4 Lakh', 'Rs 4-5 Lakh', 'Rs 5-7.5 Lakh',
    'Rs 7.5-10 Lakh',
    'Rs 10-15 Lakh', 'Rs 15-20 Lakh', 'Rs 20-25 Lakh', 'Rs 25-50 Lakh', 'Rs 50Lakh-1Crore', 'Rs 1Crore+'];
  Castes: hd[];
  Mangalika: string[];
  HoroScope: string[];
  Sects: string[];
  createProfile: string[] = ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Other'];
  Gender: string[] = ['Male', 'Female', 'Others'];
  FamilyType: string[] = ['JointFamily', 'Nuclear Family', 'Others'];
  FatherOccupation: string[] = ['Buisness', 'Service', 'Army'];
  MotherOccupation: string[] = ['Housewife', 'Buisness', 'Service', 'Army', 'Private Company',
    'Business/Self Employed', 'Government Job', 'Doctor', 'Teacher', 'Not Working'];
  Brother: any[] = ['None', 0, 1, 2, 3, '3+'];
  Sister: any[] = ['None', 0, 1, 2, 3, '3+'];
  state: string[] = ['Andaman & Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chhattisgarh', 'Dadra & Nagar Haveli',
    'Daman & Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur'
    , 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Pondichery', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu'
    , 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  City: string[] = [
    "Achalpur",
    "Achhnera",
    "Adalaj",
    "Adilabad",
    "Adityapur",
    "Adoni",
    "Adoor",
    "Adra",
    "Adyar",
    "Afzalpur",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Akot",
    "Alappuzha",
    "Aligarh",
    "AlipurdUrban Agglomerationr",
    "Alirajpur",
    "Allahabad",
    "Alwar",
    "Amalapuram",
    "Amalner",
    "Ambejogai",
    "Ambikapur",
    "Amravati",
    "Amreli",
    "Amritsar",
    "Amroha",
    "Anakapalle",
    "Anand",
    "Anantapur",
    "Anantnag",
    "Anjangaon",
    "Anjar",
    "Ankleshwar",
    "Arakkonam",
    "Arambagh",
    "Araria",
    "Arrah",
    "Arsikere",
    "Aruppukkottai",
    "Arvi",
    "Arwal",
    "Asansol",
    "Asarganj",
    "Ashok Nagar",
    "Athni",
    "Attingal",
    "Aurangabad",
    "Aurangabad",
    "Azamgarh",
    "Bagaha",
    "Bageshwar",
    "Bahadurgarh",
    "Baharampur",
    "Bahraich",
    "Balaghat",
    "Balangir",
    "Baleshwar Town",
    "Ballari",
    "Balurghat",
    "Bankura",
    "Bapatla",
    "Baramula",
    "Barbil",
    "Bargarh",
    "Barh",
    "Baripada Town",
    "Barmer",
    "Barnala",
    "Barpeta",
    "Batala",
    "Bathinda",
    "Begusarai",
    "Belagavi",
    "Bellampalle",
    "Belonia",
    "Bengaluru",
    "Bettiah",
    "BhabUrban Agglomeration",
    "Bhadrachalam",
    "Bhadrak",
    "Bhagalpur",
    "Bhainsa",
    "Bharatpur",
    "Bharuch",
    "Bhatapara",
    "Bhavnagar",
    "Bhawanipatna",
    "Bheemunipatnam",
    "Bhilai Nagar",
    "Bhilwara",
    "Bhimavaram",
    "Bhiwandi",
    "Bhiwani",
    "Bhongir",
    "Bhopal",
    "Bhubaneswar",
    "Bhuj",
    "Bikaner",
    "Bilaspur",
    "Bobbili",
    "Bodhan",
    "Bokaro Steel City",
    "Bongaigaon City",
    "Brahmapur",
    "Buxar",
    "Byasanagar",
    "Chaibasa",
    "Chalakudy",
    "Chandausi",
    "Chandigarh",
    "Changanassery",
    "Charkhi Dadri",
    "Chatra",
    "Chennai",
    "Cherthala",
    "Chhapra",
    "Chhapra",
    "Chikkamagaluru",
    "Chilakaluripet",
    "Chirala",
    "Chirkunda",
    "Chirmiri",
    "Chittoor",
    "Chittur-Thathamangalam",
    "Coimbatore",
    "Cuttack",
    "Dalli-Rajhara",
    "Darbhanga",
    "Darjiling",
    "Davanagere",
    "Deesa",
    "Dehradun",
    "Dehri-on-Sone",
    "Delhi",
    "Deoghar",
    "Dhamtari",
    "Dhanbad",
    "Dharmanagar",
    "Dharmavaram",
    "Dhenkanal",
    "Dhoraji",
    "Dhubri",
    "Dhule",
    "Dhuri",
    "Dibrugarh",
    "Dimapur",
    "Diphu",
    "Dumka",
    "Dumraon",
    "Durg",
    "Eluru",
    "English Bazar",
    "Erode",
    "Etawah",
    "Faridabad",
    "Faridkot",
    "Farooqnagar",
    "Fatehabad",
    "Fatehpur Sikri",
    "Fazilka",
    "Firozabad",
    "Firozpur Cantt.",
    "Firozpur",
    "Forbesganj",
    "Gadwal",
    "Gandhinagar",
    "Gangarampur",
    "Ganjbasoda",
    "Gaya",
    "Giridih",
    "Goalpara",
    "Gobichettipalayam",
    "Gobindgarh",
    "Godhra",
    "Gohana",
    "Gokak",
    "Gooty",
    "Gopalganj",
    "Gudivada",
    "Gudur",
    "Gumia",
    "Guntakal",
    "Guntur",
    "Gurdaspur",
    "Gurgaon",
    "Guruvayoor",
    "Guwahati",
    "Gwalior",
    "Habra",
    "Hajipur",
    "Haldwani-cum-Kathgodam",
    "Hansi",
    "Hapur",
    "Hardoi ",
    "Hardwar",
    "Hazaribag",
    "Hindupur",
    "Hisar",
    "Hoshiarpur",
    "Hubli-Dharwad",
    "Hugli-Chinsurah",
    "Hyderabad",
    "Ichalkaranji",
    "Imphal",
    "Indore",
    "Itarsi",
    "Jabalpur",
    "Jagdalpur",
    "Jaggaiahpet",
    "Jagraon",
    "Jagtial",
    "Jaipur",
    "Jalandhar Cantt.",
    "Jalandhar",
    "Jalpaiguri",
    "Jamalpur",
    "Jammalamadugu",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jamui",
    "Jangaon",
    "Jatani",
    "Jehanabad",
    "Jhansi",
    "Jhargram",
    "Jharsuguda",
    "Jhumri Tilaiya",
    "Jind",
    "Jodhpur",
    "Jorhat",
    "Kadapa",
    "Kadi",
    "Kadiri",
    "Kagaznagar",
    "Kailasahar",
    "Kaithal",
    "Kakinada",
    "Kalimpong",
    "Kalpi",
    "Kalyan-Dombivali",
    "Kamareddy",
    "Kancheepuram",
    "Kandukur",
    "Kanhangad",
    "Kannur",
    "Kanpur",
    "Kapadvanj",
    "Kapurthala",
    "Karaikal",
    "Karimganj",
    "Karimnagar",
    "Karjat",
    "Karnal",
    "Karur",
    "Karwar",
    "Kasaragod",
    "Kashipur",
    "KathUrban Agglomeration",
    "Katihar",
    "Kavali",
    "Kayamkulam",
    "Kendrapara",
    "Kendujhar",
    "Keshod",
    "Khair",
    "Khambhat",
    "Khammam",
    "Khanna",
    "Kharagpur",
    "Kharar",
    "Khowai",
    "Kishanganj",
    "Kochi",
    "Kodungallur",
    "Kohima",
    "Kolar",
    "Kolkata",
    "Kollam",
    "Koratla",
    "Korba",
    "Kot Kapura",
    "Kota",
    "Kothagudem",
    "Kottayam",
    "Kovvur",
    "Koyilandy",
    "Kozhikode",
    "Kunnamkulam",
    "Kurnool",
    "Kyathampalle",
    "Lachhmangarh",
    "Ladnu",
    "Ladwa",
    "Lahar",
    "Laharpur",
    "Lakheri",
    "Lakhimpur",
    "Lakhisarai",
    "Lakshmeshwar",
    "Lal Gopalganj Nindaura",
    "Lalganj",
    "Lalganj",
    "Lalgudi",
    "Lalitpur",
    "Lalsot",
    "Lanka",
    "Lar",
    "Lathi",
    "Latur",
    "Lilong",
    "Limbdi",
    "Lingsugur",
    "Loha",
    "Lohardaga",
    "Lonar",
    "Lonavla",
    "Longowal",
    "Loni",
    "Losal",
    "Lucknow",
    "Ludhiana",
    "Lumding",
    "Lunawada",
    "Lunglei",
    "Macherla",
    "Machilipatnam",
    "Madanapalle",
    "Maddur",
    "Madhepura",
    "Madhubani",
    "Madhugiri",
    "Madhupur",
    "Madikeri",
    "Madurai",
    "Magadi",
    "Mahad",
    "Mahalingapura",
    "Maharajganj",
    "Maharajpur",
    "Mahasamund",
    "Mahbubnagar",
    "Mahe",
    "Mahemdabad",
    "Mahendragarh",
    "Mahesana",
    "Mahidpur",
    "Mahnar Bazar",
    "Mahuva",
    "Maihar",
    "Mainaguri",
    "Makhdumpur",
    "Makrana",
    "Malaj Khand",
    "Malappuram",
    "Malavalli",
    "Malda",
    "Malegaon",
    "Malerkotla",
    "Malkangiri",
    "Malkapur",
    "Malout",
    "Malpura",
    "Malur",
    "Manachanallur",
    "Manasa",
    "Manavadar",
    "Manawar",
    "Mancherial",
    "Mandalgarh",
    "Mandamarri",
    "Mandapeta",
    "Mandawa",
    "Mandi Dabwali",
    "Mandi",
    "Mandideep",
    "Mandla",
    "Mandsaur",
    "Mandvi",
    "Mandya",
    "Manendragarh",
    "Maner",
    "Mangaldoi",
    "Mangaluru",
    "Mangalvedhe",
    "Manglaur",
    "Mangrol",
    "Mangrol",
    "Mangrulpir",
    "Manihari",
    "Manjlegaon",
    "Mankachar",
    "Manmad",
    "Mansa",
    "Mansa",
    "Manuguru",
    "Manvi",
    "Manwath",
    "Mapusa",
    "Margao",
    "Margherita",
    "Marhaura",
    "Mariani",
    "Marigaon",
    "Markapur",
    "Marmagao",
    "Masaurhi",
    "Mathabhanga",
    "Mathura",
    "Mattannur",
    "Mauganj",
    "Mavelikkara",
    "Mavoor",
    "Mayang Imphal",
    "Medak",
    "Medininagar (Daltonganj)",
    "Medinipur",
    "Meerut",
    "Mehkar",
    "Memari",
    "Merta City",
    "Mhaswad",
    "Mhow Cantonment",
    "Mhowgaon",
    "Mihijam",
    "Mira-Bhayandar",
    "Mirganj",
    "Miryalaguda",
    "Modasa",
    "Modinagar",
    "Moga",
    "Mohali",
    "Mokameh",
    "Mokokchung",
    "Monoharpur",
    "Moradabad",
    "Morena",
    "Morinda, India",
    "Morshi",
    "Morvi",
    "Motihari",
    "Motipur",
    "Mount Abu",
    "Mudabidri",
    "Mudalagi",
    "Muddebihal",
    "Mudhol",
    "Mukerian",
    "Mukhed",
    "Muktsar",
    "Mul",
    "Mulbagal",
    "Multai",
    "Mumbai",
    "Mundargi",
    "Mundi",
    "Mungeli",
    "Munger",
    "Murliganj",
    "Murshidabad",
    "Murtijapur",
    "Murwara (Katni)",
    "Musabani",
    "Mussoorie",
    "Muvattupuzha",
    "Muzaffarpur",
    "Mysore",
    "Nabadwip",
    "Nabarangapur",
    "Nabha",
    "Nadbai",
    "Nadiad",
    "Nagaon",
    "Nagapattinam",
    "Nagar",
    "Nagari",
    "Nagarkurnool",
    "Nagaur",
    "Nagda",
    "Nagercoil",
    "Nagina",
    "Nagla",
    "Nagpur",
    "Nahan",
    "Naharlagun",
    "Naidupet",
    "Naihati",
    "Naila Janjgir",
    "Nainital",
    "Nainpur",
    "Najibabad",
    "Nakodar",
    "Nakur",
    "Nalbari",
    "Namagiripettai",
    "Namakkal",
    "Nanded-Waghala",
    "Nandgaon",
    "Nandivaram-Guduvancheri",
    "Nandura",
    "Nandurbar",
    "Nandyal",
    "Nangal",
    "Nanjangud",
    "Nanjikottai",
    "Nanpara",
    "Narasapuram",
    "Narasaraopet",
    "Naraura",
    "Narayanpet",
    "Nargund",
    "Narkatiaganj",
    "Narkhed",
    "Narnaul",
    "Narsinghgarh",
    "Narsinghgarh",
    "Narsipatnam",
    "Narwana",
    "Nashik",
    "Nasirabad",
    "Natham",
    "Nathdwara",
    "Naugachhia",
    "Naugawan Sadat",
    "Nautanwa",
    "Navalgund",
    "Navsari",
    "Nawabganj",
    "Nawada",
    "Nawanshahr",
    "Nawapur",
    "Nedumangad",
    "Neem-Ka-Thana",
    "Neemuch",
    "Nehtaur",
    "Nelamangala",
    "Nellikuppam",
    "Nellore",
    "Nepanagar",
    "New Delhi",
    "Neyveli (TS)",
    "Neyyattinkara",
    "Nidadavole",
    "Nilambur",
    "Nilanga",
    "Nimbahera",
    "Nirmal",
    "Niwai",
    "Niwari",
    "Nizamabad",
    "Nohar",
    "Noida",
    "Nokha",
    "Nokha",
    "Nongstoin",
    "Noorpur",
    "North Lakhimpur",
    "Nowgong",
    "Nowrozabad (Khodargama)",
    "Nuzvid",
    "O' Valley",
    "Obra",
    "Oddanchatram",
    "Ongole",
    "Orai",
    "Osmanabad",
    "Ottappalam",
    "Ozar",
    "P.N.Patti",
    "Pachora",
    "Pachore",
    "Pacode",
    "Padmanabhapuram",
    "Padra",
    "Padrauna",
    "Paithan",
    "Pakaur",
    "Palacole",
    "Palai",
    "Palakkad",
    "Palampur",
    "Palani",
    "Palanpur",
    "Palasa Kasibugga",
    "Palghar",
    "Pali",
    "Pali",
    "Palia Kalan",
    "Palitana",
    "Palladam",
    "Pallapatti",
    "Pallikonda",
    "Palwal",
    "Palwancha",
    "Panagar",
    "Panagudi",
    "Panaji",
    "Panamattom",
    "Panchkula",
    "Panchla",
    "Pandharkaoda",
    "Pandharpur",
    "Pandhurna",
    "PandUrban Agglomeration",
    "Panipat",
    "Panna",
    "Panniyannur",
    "Panruti",
    "Panvel",
    "Pappinisseri",
    "Paradip",
    "Paramakudi",
    "Parangipettai",
    "Parasi",
    "Paravoor",
    "Parbhani",
    "Pardi",
    "Parlakhemundi",
    "Parli",
    "Partur",
    "Parvathipuram",
    "Pasan",
    "Paschim Punropara",
    "Pasighat",
    "Patan",
    "Pathanamthitta",
    "Pathankot",
    "Pathardi",
    "Pathri",
    "Patiala",
    "Patna",
    "Patratu",
    "Pattamundai",
    "Patti",
    "Pattran",
    "Pattukkottai",
    "Patur",
    "Pauni",
    "Pauri",
    "Pavagada",
    "Pedana",
    "Peddapuram",
    "Pehowa",
    "Pen",
    "Perambalur",
    "Peravurani",
    "Peringathur",
    "Perinthalmanna",
    "Periyakulam",
    "Periyasemur",
    "Pernampattu",
    "Perumbavoor",
    "Petlad",
    "Phagwara",
    "Phalodi",
    "Phaltan",
    "Phillaur",
    "Phulabani",
    "Phulera",
    "Phulpur",
    "Phusro",
    "Pihani",
    "Pilani",
    "Pilibanga",
    "Pilibhit",
    "Pilkhuwa",
    "Pindwara",
    "Pinjore",
    "Pipar City",
    "Pipariya",
    "Piriyapatna",
    "Piro",
    "Pithampur",
    "Pithapuram",
    "Pithoragarh",
    "Pollachi",
    "Polur",
    "Pondicherry",
    "Ponnani",
    "Ponneri",
    "Ponnur",
    "Porbandar",
    "Porsa",
    "Port Blair",
    "Powayan",
    "Prantij",
    "Pratapgarh",
    "Pratapgarh",
    "Prithvipur",
    "Proddatur",
    "Pudukkottai",
    "Pudupattinam",
    "Pukhrayan",
    "Pulgaon",
    "Puliyankudi",
    "Punalur",
    "Punch",
    "Pune",
    "Punganur",
    "Punjaipugalur",
    "Puranpur",
    "Puri",
    "Purna",
    "Purnia",
    "PurqUrban Agglomerationzi",
    "Purulia",
    "Purwa",
    "Pusad",
    "Puthuppally",
    "Puttur",
    "Puttur",
    "Qadian",
    "Raayachuru",
    "Rabkavi Banhatti",
    "Radhanpur",
    "Rae Bareli",
    "Rafiganj",
    "Raghogarh-Vijaypur",
    "Raghunathganj",
    "Raghunathpur",
    "Rahatgarh",
    "Rahuri",
    "Raiganj",
    "Raigarh",
    "Raikot",
    "Raipur",
    "Rairangpur",
    "Raisen",
    "Raisinghnagar",
    "Rajagangapur",
    "Rajahmundry",
    "Rajakhera",
    "Rajaldesar",
    "Rajam",
    "Rajampet",
    "Rajapalayam",
    "Rajauri",
    "Rajgarh (Alwar)",
    "Rajgarh (Churu)",
    "Rajgarh",
    "Rajgir",
    "Rajkot",
    "Rajnandgaon",
    "Rajpipla",
    "Rajpura",
    "Rajsamand",
    "Rajula",
    "Rajura",
    "Ramachandrapuram",
    "Ramagundam",
    "Ramanagaram",
    "Ramanathapuram",
    "Ramdurg",
    "Rameshwaram",
    "Ramganj Mandi",
    "Ramgarh",
    "Ramnagar",
    "Ramnagar",
    "Ramngarh",
    "Rampur Maniharan",
    "Rampur",
    "Rampura Phul",
    "Rampurhat",
    "Ramtek",
    "Ranaghat",
    "Ranavav",
    "Ranchi",
    "Ranebennuru",
    "Rangia",
    "Rania",
    "Ranibennur",
    "Ranipet",
    "Rapar",
    "Rasipuram",
    "Rasra",
    "Ratangarh",
    "Rath",
    "Ratia",
    "Ratlam",
    "Ratnagiri",
    "Rau",
    "Raurkela",
    "Raver",
    "Rawatbhata",
    "Rawatsar",
    "Raxaul Bazar",
    "Rayachoti",
    "Rayadurg",
    "Rayagada",
    "Reengus",
    "Rehli",
    "Renigunta",
    "Renukoot",
    "Reoti",
    "Repalle",
    "Revelganj",
    "Rewa",
    "Rewari",
    "Rishikesh",
    "Risod",
    "Robertsganj",
    "Robertson Pet",
    "Rohtak",
    "Ron",
    "Roorkee",
    "Rosera",
    "Rudauli",
    "Rudrapur",
    "Rudrapur",
    "Rupnagar",
    "Sabalgarh",
    "Sadabad",
    "Sadalagi",
    "Sadasivpet",
    "Sadri",
    "Sadulpur",
    "Sadulshahar",
    "Safidon",
    "Safipur",
    "Sagar",
    "Sagara",
    "Sagwara",
    "Saharanpur",
    "Saharsa",
    "Sahaspur",
    "Sahaswan",
    "Sahawar",
    "Sahibganj",
    "Sahjanwa",
    "Saidpur",
    "Saiha",
    "Sailu",
    "Sainthia",
    "Sakaleshapura",
    "Sakti",
    "Salaya",
    "Salem",
    "Salur",
    "Samalkha",
    "Samalkot",
    "Samana",
    "Samastipur",
    "Sambalpur",
    "Sambhal",
    "Sambhar",
    "Samdhan",
    "Samthar",
    "Sanand",
    "Sanawad",
    "Sanchore",
    "Sandi",
    "Sandila",
    "Sanduru",
    "Sangamner",
    "Sangareddy",
    "Sangaria",
    "Sangli",
    "Sangole",
    "Sangrur",
    "Sankarankovil",
    "Sankari",
    "Sankeshwara",
    "Santipur",
    "Sarangpur",
    "Sardarshahar",
    "Sardhana",
    "Sarni",
    "Sarsod",
    "Sasaram",
    "Sasvad",
    "Satana",
    "Satara",
    "Sathyamangalam",
    "Satna",
    "Sattenapalle",
    "Sattur",
    "Saunda",
    "Saundatti-Yellamma",
    "Sausar",
    "Savanur",
    "Savarkundla",
    "Savner",
    "Sawai Madhopur",
    "Sawantwadi",
    "Sedam",
    "Sehore",
    "Sendhwa",
    "Seohara",
    "Seoni",
    "Seoni-Malwa",
    "Shahabad",
    "Shahabad, Hardoi",
    "Shahabad, Rampur",
    "Shahade",
    "Shahbad",
    "Shahdol",
    "Shahganj",
    "Shahjahanpur",
    "Shahpur",
    "Shahpura",
    "Shahpura",
    "Shajapur",
    "Shamgarh",
    "Shamli",
    "Shamsabad, Agra",
    "Shamsabad, Farrukhabad",
    "Shegaon",
    "Sheikhpura",
    "Shendurjana",
    "Shenkottai",
    "Sheoganj",
    "Sheohar",
    "Sheopur",
    "Sherghati",
    "Sherkot",
    "Shiggaon",
    "Shikaripur",
    "Shikarpur, Bulandshahr",
    "Shikohabad",
    "Shillong",
    "Shimla",
    "Shirdi",
    "Shirpur-Warwade",
    "Shirur",
    "Shishgarh",
    "Shivamogga",
    "Shivpuri",
    "Sholavandan",
    "Sholingur",
    "Shoranur",
    "Shrigonda",
    "Shrirampur",
    "Shrirangapattana",
    "Shujalpur",
    "Siana",
    "Sibsagar",
    "Siddipet",
    "Sidhi",
    "Sidhpur",
    "Sidlaghatta",
    "Sihor",
    "Sihora",
    "Sikanderpur",
    "Sikandra Rao",
    "Sikandrabad",
    "Sikar",
    "Silao",
    "Silapathar",
    "Silchar",
    "Siliguri",
    "Sillod",
    "Silvassa",
    "Simdega",
    "Sindagi",
    "Sindhagi",
    "Sindhnur",
    "Singrauli",
    "Sinnar",
    "Sira",
    "Sircilla",
    "Sirhind Fatehgarh Sahib",
    "Sirkali",
    "Sirohi",
    "Sironj",
    "Sirsa",
    "Sirsaganj",
    "Sirsi",
    "Sirsi",
    "Siruguppa",
    "Sitamarhi",
    "Sitapur",
    "Sitarganj",
    "Sivaganga",
    "Sivagiri",
    "Sivakasi",
    "Siwan",
    "Sohagpur",
    "Sohna",
    "Sojat",
    "Solan",
    "Solapur",
    "Sonamukhi",
    "Sonepur",
    "Songadh",
    "Sonipat",
    "Sopore",
    "Soro",
    "Soron",
    "Soyagaon",
    "Sri Madhopur",
    "Srikakulam",
    "Srikalahasti",
    "Srinagar",
    "Srinagar",
    "Srinivaspur",
    "Srirampore",
    "Srisailam Project (Right Flank Colony) Township",
    "Srivilliputhur",
    "Sugauli",
    "Sujangarh",
    "Sujanpur",
    "Sullurpeta",
    "Sultanganj",
    "Sultanpur",
    "Sumerpur",
    "Sumerpur",
    "Sunabeda",
    "Sunam",
    "Sundargarh",
    "Sundarnagar",
    "Supaul",
    "Surandai",
    "Surapura",
    "Surat",
    "Suratgarh",
    "SUrban Agglomerationr",
    "Suri",
    "Suriyampalayam",
    "Suryapet",
    "Tadepalligudem",
    "Tadpatri",
    "Takhatgarh",
    "Taki",
    "Talaja",
    "Talcher",
    "Talegaon Dabhade",
    "Talikota",
    "Taliparamba",
    "Talode",
    "Talwara",
    "Tamluk",
    "Tanda",
    "Tandur",
    "Tanuku",
    "Tarakeswar",
    "Tarana",
    "Taranagar",
    "Taraori",
    "Tarbha",
    "Tarikere",
    "Tarn Taran",
    "Tasgaon",
    "Tehri",
    "Tekkalakote",
    "Tenali",
    "Tenkasi",
    "Tenu dam-cum-Kathhara",
    "Terdal",
    "Tezpur",
    "Thakurdwara",
    "Thammampatti",
    "Thana Bhawan",
    "Thane",
    "Thanesar",
    "Thangadh",
    "Thanjavur",
    "Tharad",
    "Tharamangalam",
    "Tharangambadi",
    "Theni Allinagaram",
    "Thirumangalam",
    "Thirupuvanam",
    "Thiruthuraipoondi",
    "Thiruvalla",
    "Thiruvallur",
    "Thiruvananthapuram",
    "Thiruvarur",
    "Thodupuzha",
    "Thoubal",
    "Thrissur",
    "Thuraiyur",
    "Tikamgarh",
    "Tilda Newra",
    "Tilhar",
    "Tindivanam",
    "Tinsukia",
    "Tiptur",
    "Tirora",
    "Tiruchendur",
    "Tiruchengode",
    "Tiruchirappalli",
    "Tirukalukundram",
    "Tirukkoyilur",
    "Tirunelveli",
    "Tirupathur",
    "Tirupathur",
    "Tirupati",
    "Tiruppur",
    "Tirur",
    "Tiruttani",
    "Tiruvannamalai",
    "Tiruvethipuram",
    "Tiruvuru",
    "Tirwaganj",
    "Titlagarh",
    "Tittakudi",
    "Todabhim",
    "Todaraisingh",
    "Tohana",
    "Tonk",
    "Tuensang",
    "Tuljapur",
    "Tulsipur",
    "Tumkur",
    "Tumsar",
    "Tundla",
    "Tuni",
    "Tura",
    "Uchgaon",
    "Udaipur",
    "Udaipur",
    "Udaipurwati",
    "Udgir",
    "Udhagamandalam",
    "Udhampur",
    "Udumalaipettai",
    "Udupi",
    "Ujhani",
    "Ujjain",
    "Umarga",
    "Umaria",
    "Umarkhed",
    "Umbergaon",
    "Umred",
    "Umreth",
    "Una",
    "Unjha",
    "Unnamalaikadai",
    "Unnao",
    "Upleta",
    "Uran Islampur",
    "Uran",
    "Uravakonda",
    "Urmar Tanda",
    "Usilampatti",
    "Uthamapalayam",
    "Uthiramerur",
    "Utraula",
    "Vadakkuvalliyur",
    "Vadalur",
    "Vadgaon Kasba",
    "Vadipatti",
    "Vadnagar",
    "Vadodara",
    "Vaijapur",
    "Vaikom",
    "Valparai",
    "Valsad",
    "Vandavasi",
    "Vaniyambadi",
    "Vapi",
    "Vapi",
    "Varanasi",
    "Varkala",
    "Vasai-Virar",
    "Vatakara",
    "Vedaranyam",
    "Vellakoil",
    "Vellore",
    "Venkatagiri",
    "Veraval",
    "Vidisha",
    "Vijainagar, Ajmer",
    "Vijapur",
    "Vijayapura",
    "Vijayawada",
    "Vijaypur",
    "Vikarabad",
    "Vikramasingapuram",
    "Viluppuram",
    "Vinukonda",
    "Viramgam",
    "Virudhachalam",
    "Virudhunagar",
    "Visakhapatnam",
    "Visnagar",
    "Viswanatham",
    "Vita",
    "Vizianagaram",
    "Vrindavan",
    "Vyara",
    "Wadgaon Road",
    "Wadhwan",
    "Wadi",
    "Wai",
    "Wanaparthy",
    "Wani",
    "Wankaner",
    "Wara Seoni",
    "Warangal",
    "Wardha",
    "Warhapur",
    "Warisaliganj",
    "Warora",
    "Warud",
    "Washim",
    "Wokha",
    "Yadgir",
    "Yamunanagar",
    "Yanam",
    "Yavatmal",
    "Yawal",
    "Yellandu",
    "Yemmiganur",
    "Yerraguntla",
    "Yevla",
    "Zaidpur",
    "Zamania",
    "Zira",
    "Zirakpur",
    "Zunheboto",
  ];
  FamilyOptions: Observable<string[]>;
  ProfileOptions: Observable<string[]>;
  GenderOptions: Observable<string[]>;
  fo: Observable<string[]>; mo: Observable<string[]>;
  bro: Observable<any[]>; sis: Observable<any[]>;
  stateo: Observable<string[]>;
  city: Observable<string[]>;
  ReligionOptions: Observable<string[]>;
  MartalStatusOtions: Observable<string[]>;
  stateGroupOptions: Observable<StateGroup[]>;
  CasteOptions: Observable<hd[]>;
  MangalikOptions: Observable<string[]>;
  HoroScopeOptions: Observable<string[]>;
  OccupatiinOptions: Observable<string[]>;
  AOptions: Observable<any[]>;
  HigherEducationOptions: Observable<hd[]>;

  constructor(private _formBuilder: FormBuilder, private Auth: AuthService) {
    this.stateForm = this._formBuilder.group({
      stateGroup: ['', Validators.compose([Validators.required])],
      Religion: ['', Validators.compose([Validators.required])],
      MaritalStatus: ['', Validators.compose([Validators.required])],
      Height: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      Castes: ['', Validators.compose([])],
      Mangalik: ['', Validators.compose([])],
      HoroScope: ['', Validators.compose([])],
      Sect: ['', Validators.compose([])],
      Open: [false]
    });
    this.AccountDetails = this._formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])],
      'fullname': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'create': ['', Validators.compose([Validators.required])],
      'gender': ['', Validators.compose([Validators.required])],
      'phoneNumber': ['', Validators.compose([Validators.pattern('[0-9]*'),
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)])],
      'Date': ['', Validators.compose([Validators.required])]
    });
    this.EducationDetails = this._formBuilder.group({
      'HighestDegree': ['', Validators.compose([Validators.required])],
      'UgCollege': [''],
      'Occupation': ['', Validators.compose([Validators.required])],
      'AnnualIncome': ['', Validators.compose([Validators.required])],
      'Yourself': ['', Validators.compose([Validators.required])],
    });
    this.FamilyDetails = this._formBuilder.group({
      'FamilyType': [''],
      'FatherOccupation': [''],
      'MotherOccupation': [''],
      'brother': [''],
      'sister': [''],
      'umbrother': [''],
      'umsister': [''],
      'state': [''],
      'city': [''],
      'address': [''],
      'about': ['']
    });
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  private _educGroup(value: string): hd[] {
    if (value) {
      return this.HigherEducation
        .map(group => ({ group: group.group, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.HigherEducation;
  }
  private _Castefilter(value: string): hd[] {
    if (value) {
      return this.Castes
        .map(group => ({ group: group.group, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }
    return this.Castes;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Religions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _profilefilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.createProfile.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _genderfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Gender.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _ofilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Occupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Afilter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.AnnualIncome.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Maritalfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.MaritalStaus.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _Mangalikfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Mangalika.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _HoroScopefilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.HoroScope.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private ft(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.FamilyType.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private fato(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.FatherOccupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private mato(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.MotherOccupation.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private brot(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Brother.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private sist(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.Sister.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private stt(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.state.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private cityf(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.City.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // Calucalting age
  caluclateAge(event: any) {
    const timediffernce = Math.abs(Date.now() - event);
    const age = Math.floor((timediffernce / (1000 * 3600 * 24)) / 365);
    if (age < 18) {
      this.birthdayValid = false;
    } else {
      this.birthdayValid = true;
    }
  }

  Religion(event) {
    if (event.value === 'Hindu') {
      this.Castes = [{
        group: 'A',
        names: [
          "Ad Dharmi",
          "Adi Andhra",
          "Adi Dravida",
          "Adi Karnataka",
          "Agamudayar",
          "Aggarwal",
          "Agri",
          "Ahir",
          "Ahom",
          "Ambalavasi",
          "Arora",
          "Arunthathiyar",
          "Arya Vysya"]
      }, {
        group: 'B',
        names: ["Baghel/Gaderiya",
          "Baidya",
          "Baishnab",
          "Baishya",
          "Balija",
          "Balija Naidu",
          "Bania",
          "Banik",
          "Banjara",
          "Bari",
          "Barujibi",
          "Besta",
          "Bhandari",
          "Bhatia",
          "Bhatraju",
          "Bhavsar",
          "Bhovi/Bhoi",
          "Billava",
          "Bisa Agarwal",
          "Bishnoi/Vishnoi",
          "Boyer",
          "Brahmbatt",
          "Brahmin",
          "Brahmin 6000 Niyogi",
          "Brahmin Anavil",
          "Brahmin Audichya",
          "Brahmin Bajkhedwal",
          "Brahmin Bardai",
          "Brahmin Barendra",
          "Brahmin Bhargava",
          "Brahmin Bhatt",
          "Brahmin Bhumihar",
          "Brahmin Brahacharanam",
          "Brahmin BrahmBhatt",
          "Brahmin Brajastha Mathil",
          "Brahmin Dadhich",
          "Brahmin Daivadnya",
          "Brahmin Deshastha",
          "Brahmin Deshastha",
          "Brahmin Dhiman",
          "Brahmin Dravida",
          "Brahmin Dunua",
          "Brahmin Embrandiri",
          "Brahmin Garhwali",
          "Brahmin Gaud Saraswat (GSB)",
          "Brahmin Gaur",
          "Brahmin Goswami",
          "Brahmin Gujar Gaur",
          "Brahmin Gurukkal",
          "Brahmin Halua",
          "Brahmin Havyaka",
          "Brahmin Hoysala",
          "Brahmin Iyengar",
          "Brahmin Iyer",
          "Brahmin Jangid",
          "Brahmin Jangra",
          "Brahmin Jhadua",
          "Brahmin Jhijhotiya",
          "Brahmin Jogi",
          "Brahmin Jyotish",
          "Brahmin Kanyakubj",
          "Brahmin Karhade",
          "Brahmin Kashmiri Pandit",
          "Brahmin Khadayat",
          "Brahmin Khandelwal",
          "Brahmin Khedaval",
          "Brahmin Koknastha",
          "Brahmin Kota",
          "Brahmin Kulin",
          "Brahmin Kumaoni",
          "Brahmin Madhwa",
          "Brahmin Maithil",
          "Brahmin Malviya",
          "Brahmin Mevada",
          "Brahmin Modh",
          "Brahmin Mohyal",
          "Brahmin Nagar",
          "Brahmin Namboodiri",
          "Brahmin Narmadiya",
          "Brahmin Paliwal",
          "Brahmin Panda",
          "Brahmin Pandit",
          "Brahmin Panicker",
          "Brahmin Pareek",
          "Brahmin Pushkarna",
          "Brahmin Rajgor",
          "Brahmin Rarhi",
          "Brahmin Rigvedi",
          "Brahmin Rudraj",
          "Brahmin Sakaldwipi",
          "Brahmin Sanadya",
          "Brahmin Sanketi",
          "Brahmin Saraswat",
          "Brahmin Sarua",
          "Brahmin Saryuparin",
          "Brahmin Shivalli",
          "Brahmin Shrimali",
          "Brahmin Sikhwal",
          "Brahmin Smartha",
          "Brahmin Sri Vishnava",
          "Brahmin Stanika",
          "Brahmin Tapodhan",
          "Brahmin Tyagi",
          "Brahmin Vaidiki",
          "Brahmin Vaikhawas",
          "Brahmin Valam",
          "Brahmin Velanadu",
          "Brahmin Viswa",
          "Brahmin Vyas",
          "Brahmin Yajurvedi",
          "Brahmin Zalora",
          "Brahmo",
          "Bunt/Shetty"]
      },
      {
        group: 'C',
        names: [
          'Chamar', 'Chambhar', 'Chandravanshi Kahar', 'Chasa', 'Chattada Sri Vaishnava', 'Chaudary'
          , 'Chaurasia', 'Chettiar', 'Chhetri', 'CKP', 'Coorgi']
      },
      {
        group: 'D',
        names: ["Deshastha Maratha",
          "Devadigas",
          "Devang Koshthi",
          "Devanga",
          "Devendra Kula Vellalar",
          "Dhangar",
          "Dheevara",
          "Dhoba",
          "Dhobi",
          "Dusadh"]
      },
      {
        group: 'E',
        names: ['Edigas', "Ezhava", "Ezhuthachan"]
      },
      {
        group: 'G',
        names: ["Gabit",
          "Ganiga",
          "Garhwali",
          "Gavali",
          "Gavara",
          "Ghumar",
          "Goala",
          "Goan",
          "Gomantak Maratha",
          "Gondhali",
          "Goud",
          "Gounder",
          "Gowda",
          "Gramani",
          "Gudia",
          "Gujjar",
          "Gupta",
          "Gurav"]
      },
      {
        group: 'H',
        names: ['Hegde']
      },
      {
        group: 'J',
        names: ["Jaiswal", "Jangam", "Jat", "Jatav"]
      },
      {
        group: 'K',
        names: ["Kadava patel",
          "Kahar",
          "Kaibarta",
          "Kalal",
          "Kalar",
          "Kalinga Vysya",
          "Kalwar",
          "Kamboj",
          "Kamma",
          "Kansari",
          "Kapol",
          "Kapu",
          "Kapu Munnuru",
          "Karana",
          "Karmakar",
          "Karuneegar",
          "Kasar",
          "Kashyap",
          "Kayastha",
          "Khandayat",
          "Khandelwal",
          "Kharwar",
          "Khatik",
          "Khatri",
          "Kokanastha Maratha",
          "Koli",
          "Koli Mahadev",
          "Kongu Vellala Gounder",
          "Konkani",
          "Kori",
          "Koshti",
          "Kshatriya",
          "Kshatriya Agnikula",
          "Kudumbi",
          "Kulalar",
          "Kulita",
          "Kumawat",
          "Kumbhakar",
          "Kumhar/Kumbhar",
          "Kummari",
          "Kunbi",
          "Kurmi",
          "Kurmi kshatriya",
          "Kuruba",
          "Kuruhina shetty",
          "Kurumbar",
          "Kushwaha",
          "Kutchi",
          "Kutchi Gurjar"]
      },
      {
        group: 'L',
        names: [
          "Lambadi",
          "Leva Patidar",
          "Leva Patil",
          "Lingayat",
          "Lodhi Rajput",
          "Lohana",
          "Lohar",
          "Lubana"
        ]
      },

        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // ,

        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // ,
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // },
        // {
        //   group: 'Doctorate',
        //   names: ["Ph.D", "M.Phil"]
        // }
      ];
      this.Mangalika = ['Mangalik', 'Non-managalik', 'Anshik managalik'];
      this.HoroScope = ['Must', 'Not Necessary'];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.value === 'Muslim') {
      this.Castes = [
        {
          group: 'S',
          names: ["Shia", "Sunni"]
        }
      ];
      this.Caste = true;
      this.Sects = ['Shia', 'Sunni'];
      this.S = true;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.value === 'Sikh') {
      this.Castes = [
        {
          group: 'A',
          names: ['Arora']
        },
        {
          group: 'B',
          names: ['Bhatia']
        },
        {
          group: 'G',
          names: ['Gurkish']
        },
        {
          group: 'j',
          names: ['jat']
        },
        {
          group: 'l',
          names: ["Labana"]
        },
        {
          group: 'M',
          names: ["Mazbhi"]
        },
        {
          group: 'O',
          names: ['Others']
        },
        {
          group: 'R',
          names: ['Rajput', 'Rmadasia', 'Ramagharia']
        },
        {
          group: 'S',
          names: ['Saini']
        },
      ];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.value === 'Christian') {
      this.Caste = false;
      this.Sects = ['AngloIndia', 'BornIndian'];
      this.S = true;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.value === 'Buddhist') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.value === 'Jain') {
      this.Castes = [
        {
          group: 'D',
          names: ['Digamber']
        },
        {
          group: 'O',
          names: ['Others']
        },
        {
          group: 'S',
          names: ["Shwetamber"]
        },
      ];
      this.Mangalika = ['Mangalik', 'Non-managalik', 'Anshik managalik'];
      this.HoroScope = ['Must', 'Not Necessary'];
      this.Caste = true;
      this.S = false;
      this.AllCastes = true;
      this.HoroScopes = true;
      this.Mangaliks = true;
    } else if (event.value === 'Parsi') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.value === 'Jewish') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    } else if (event.value === 'Bahai') {
      this.Caste = false;
      this.S = false;
      this.AllCastes = false;
      this.HoroScopes = false;
      this.Mangaliks = false;
    }
  }

  firstStep() {
    const firststepdata = new FormData();
    firststepdata.append('email', this.AccountDetails.value.email);
    firststepdata.append('password', this.AccountDetails.value.password);
    firststepdata.append('relation', this.AccountDetails.value.create);
    firststepdata.append('gender', this.AccountDetails.value.gender);
    firststepdata.append('name', this.AccountDetails.value.fullname);
    firststepdata.append('birth_date', this.AccountDetails.value.Date);
    firststepdata.append('mobile', this.AccountDetails.value.phoneNumber);
    this.Auth.firstPage(firststepdata).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  secondStep() {
    console.log(this.stateForm.value.Open);
    const secondstepdata = new FormData();
    secondstepdata.append('mother_tongue', this.stateForm.value.stateGroup);
    secondstepdata.append('religion', this.stateForm.value.Religion);
    secondstepdata.append('caste_no_bar', this.stateForm.value.Open);
    secondstepdata.append('subcaste', this.stateForm.value.Castes);
    secondstepdata.append('manglik', this.stateForm.value.Mangalik);
    secondstepdata.append('horoscope', this.stateForm.value.HoroScope);
    secondstepdata.append('marital_status', this.stateForm.value.MaritalStatus);
    secondstepdata.append('height', this.stateForm.value.Height);
    secondstepdata.append('country', this.stateForm.value.phoneNumber);
    secondstepdata.append('state', this.stateForm.value.phoneNumber);
    secondstepdata.append('city', this.stateForm.value.phoneNumber);
    this.Auth.secondPage(secondstepdata).subscribe(suc => {
      console.log(suc);
    }, err => {
      // console.log(err);
    });
  }
  thirdStep() {
    const thirdstepdata = new FormData();
    thirdstepdata.append('degree', this.EducationDetails.value.HighestDegree);
    thirdstepdata.append('college', this.EducationDetails.value.UgCollege);
    thirdstepdata.append('occupation', this.EducationDetails.value.Occupation);
    thirdstepdata.append('annual_income', this.EducationDetails.value.AnnualIncome);
    thirdstepdata.append('about', this.EducationDetails.value.Yourself);
    this.Auth.thirdPage(thirdstepdata).subscribe(suc => {
      console.log(suc);
    }, err => {
    });
  }
  fourthStep() {
    const fourthstepdata = new FormData();
    fourthstepdata.append('family_type', this.FamilyDetails.value.FamilyType);
    fourthstepdata.append('occupation_father', this.FamilyDetails.value.FatherOccupation);
    fourthstepdata.append('occupation_mother', this.FamilyDetails.value.MotherOccupation);
    fourthstepdata.append('married_sons', this.FamilyDetails.value.brother);
    fourthstepdata.append('unmarried_sons', this.FamilyDetails.value.umbrother);
    fourthstepdata.append('married_daughters', this.FamilyDetails.value.sister);
    fourthstepdata.append('unmarried_daughters', this.FamilyDetails.value.umsister);
    fourthstepdata.append('locality', this.FamilyDetails.value.state);
    fourthstepdata.append('city', this.FamilyDetails.value.city);
    fourthstepdata.append('address', this.FamilyDetails.value.address);
    fourthstepdata.append('about', this.FamilyDetails.value.about);
    this.Auth.FourthPage(fourthstepdata).subscribe(suc => {
      console.log(suc);
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
    this.Auth.getAlldegree().subscribe((res: any) => {
      this.HigherEducation.push(res);
      console.log(this.HigherEducation)
    }, err => {
      // console.log(err);
    });
    this.Auth.getcastes().subscribe(res => {
      console.log(res);
    }, err => {
      // console.log(err);
    });
    this.Auth.getcity().subscribe((res: any) => {
      this.City.push(JSON.parse(res));
      console.log('sata' + this.City);
      console.log('state');
    }, err => {
      // console.log(err);
    });
    if (window.screen.width > 768) {
      this.Advertise = true;
    } else {
      this.Advertise = false;
    }
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    // tslint:disable-next-line:no-non-null-assertion
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.HigherEducationOptions = this.EducationDetails.get('HighestDegree')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._educGroup(value))
      );
    // tslint:disable-next-line:no-non-null-assertion
    this.ReligionOptions = this.stateForm.get('Religion')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.MartalStatusOtions = this.stateForm.get('MaritalStatus')!.valueChanges.pipe(
      startWith(''),
      map(value => this._Maritalfilter(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.HigherEducationOptions = this.EducationDetails.get('HighestDegree')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._educGroup(value))
    );
    this.CasteOptions = this.stateForm.get('Castes')!.valueChanges.pipe(
      startWith(''),
      map(value => this._Castefilter(value))
    );
    this.ProfileOptions = this.AccountDetails.get('create')!.valueChanges.pipe(
      startWith(''),
      map(value => this._profilefilter(value))
    );
    this.GenderOptions = this.AccountDetails.get('gender')!.valueChanges.pipe(
      startWith(''),
      map(value => this._genderfilter(value))
    );
    this.MangalikOptions = this.stateForm.get('Mangalik')!.valueChanges.pipe(
      startWith(''),
      map(value => this._Mangalikfilter(value))
    );
    this.HoroScopeOptions = this.stateForm.get('Castes')!.valueChanges.pipe(
      startWith(''),
      map(value => this._HoroScopefilter(value))
    );
    this.OccupatiinOptions = this.EducationDetails.get('Occupation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._ofilter(value))
    );
    this.AOptions = this.EducationDetails.get('AnnualIncome')!.valueChanges.pipe(
      startWith(''),
      map(value => this._Afilter(value))
    );
    this.FamilyOptions = this.FamilyDetails.get('FamilyType')!.valueChanges.pipe(
      startWith(''),
      map(value => this.ft(value))
    );
    this.fo = this.FamilyDetails.get('FatherOccupation')!.valueChanges.pipe(
      startWith(''),
      map(value => this.fato(value))
    );
    // tslint:disable-next-line:no-non-null-assertion
    this.mo = this.FamilyDetails.get('MotherOccupation')!.valueChanges.pipe(
      startWith(''),
      map(value => this.mato(value))
    );
    this.bro = this.FamilyDetails.get('brother')!.valueChanges.pipe(
      startWith(''),
      map(value => this.brot(value))
    );
    this.sis = this.FamilyDetails.get('sister')!.valueChanges.pipe(
      startWith(''),
      map(value => this.sist(value))
    );
    this.stateo = this.FamilyDetails.get('state')!.valueChanges.pipe(
      startWith(''),
      map(value => this.stt(value))
    );
    this.city = this.FamilyDetails.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this.cityf(value))
    );
  }
}
