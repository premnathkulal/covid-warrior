const STATES = [
  {
    state_id: 1,
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_id: 2,
    state_name: 'Andhra Pradesh',
  },
  {
    state_id: 3,
    state_name: 'Arunachal Pradesh',
  },
  {
    state_id: 4,
    state_name: 'Assam',
  },
  {
    state_id: 5,
    state_name: 'Bihar',
  },
  {
    state_id: 6,
    state_name: 'Chandigarh',
  },
  {
    state_id: 7,
    state_name: 'Chhattisgarh',
  },
  {
    state_id: 8,
    state_name: 'Dadra and Nagar Haveli',
  },
  {
    state_id: 37,
    state_name: 'Daman and Diu',
  },
  {
    state_id: 9,
    state_name: 'Delhi',
  },
  {
    state_id: 10,
    state_name: 'Goa',
  },
  {
    state_id: 11,
    state_name: 'Gujarat',
  },
  {
    state_id: 12,
    state_name: 'Haryana',
  },
  {
    state_id: 13,
    state_name: 'Himachal Pradesh',
  },
  {
    state_id: 14,
    state_name: 'Jammu and Kashmir',
  },
  {
    state_id: 15,
    state_name: 'Jharkhand',
  },
  {
    state_id: 16,
    state_name: 'Karnataka',
  },
  {
    state_id: 17,
    state_name: 'Kerala',
  },
  {
    state_id: 18,
    state_name: 'Ladakh',
  },
  {
    state_id: 19,
    state_name: 'Lakshadweep',
  },
  {
    state_id: 20,
    state_name: 'Madhya Pradesh',
  },
  {
    state_id: 21,
    state_name: 'Maharashtra',
  },
  {
    state_id: 22,
    state_name: 'Manipur',
  },
  {
    state_id: 23,
    state_name: 'Meghalaya',
  },
  {
    state_id: 24,
    state_name: 'Mizoram',
  },
  {
    state_id: 25,
    state_name: 'Nagaland',
  },
  {
    state_id: 26,
    state_name: 'Odisha',
  },
  {
    state_id: 27,
    state_name: 'Puducherry',
  },
  {
    state_id: 28,
    state_name: 'Punjab',
  },
  {
    state_id: 29,
    state_name: 'Rajasthan',
  },
  {
    state_id: 30,
    state_name: 'Sikkim',
  },
  {
    state_id: 31,
    state_name: 'Tamil Nadu',
  },
  {
    state_id: 32,
    state_name: 'Telangana',
  },
  {
    state_id: 33,
    state_name: 'Tripura',
  },
  {
    state_id: 34,
    state_name: 'Uttar Pradesh',
  },
  {
    state_id: 35,
    state_name: 'Uttarakhand',
  },
  {
    state_id: 36,
    state_name: 'West Bengal',
  },
]

const DISTRICTS = [
  {
    stateId: '16',
    district: [
      {
        district_id: 270,
        district_name: 'Bagalkot',
      },
      {
        district_id: 276,
        district_name: 'Bangalore Rural',
      },
      {
        district_id: 265,
        district_name: 'Bangalore Urban',
      },
      {
        district_id: 294,
        district_name: 'BBMP',
      },
      {
        district_id: 264,
        district_name: 'Belgaum',
      },
      {
        district_id: 274,
        district_name: 'Bellary',
      },
      {
        district_id: 272,
        district_name: 'Bidar',
      },
      {
        district_id: 271,
        district_name: 'Chamarajanagar',
      },
      {
        district_id: 273,
        district_name: 'Chikamagalur',
      },
      {
        district_id: 291,
        district_name: 'Chikkaballapur',
      },
      {
        district_id: 268,
        district_name: 'Chitradurga',
      },
      {
        district_id: 269,
        district_name: 'Dakshina Kannada',
      },
      {
        district_id: 275,
        district_name: 'Davanagere',
      },
      {
        district_id: 278,
        district_name: 'Dharwad',
      },
      {
        district_id: 280,
        district_name: 'Gadag',
      },
      {
        district_id: 267,
        district_name: 'Gulbarga',
      },
      {
        district_id: 289,
        district_name: 'Hassan',
      },
      {
        district_id: 279,
        district_name: 'Haveri',
      },
      {
        district_id: 283,
        district_name: 'Kodagu',
      },
      {
        district_id: 277,
        district_name: 'Kolar',
      },
      {
        district_id: 282,
        district_name: 'Koppal',
      },
      {
        district_id: 290,
        district_name: 'Mandya',
      },
      {
        district_id: 266,
        district_name: 'Mysore',
      },
      {
        district_id: 284,
        district_name: 'Raichur',
      },
      {
        district_id: 292,
        district_name: 'Ramanagara',
      },
      {
        district_id: 287,
        district_name: 'Shimoga',
      },
      {
        district_id: 288,
        district_name: 'Tumkur',
      },
      {
        district_id: 286,
        district_name: 'Udupi',
      },
      {
        district_id: 281,
        district_name: 'Uttar Kannada',
      },
      {
        district_id: 293,
        district_name: 'Vijayapura',
      },
      {
        district_id: 285,
        district_name: 'Yadgir',
      },
    ],
  },
  {
    stateId: '17',
    district: [
      {
        district_id: 301,
        district_name: 'Alappuzha',
      },
      {
        district_id: 307,
        district_name: 'Ernakulam',
      },
      {
        district_id: 306,
        district_name: 'Idukki',
      },
      {
        district_id: 297,
        district_name: 'Kannur',
      },
      {
        district_id: 295,
        district_name: 'Kasaragod',
      },
      {
        district_id: 298,
        district_name: 'Kollam',
      },
      {
        district_id: 304,
        district_name: 'Kottayam',
      },
      {
        district_id: 305,
        district_name: 'Kozhikode',
      },
      {
        district_id: 302,
        district_name: 'Malappuram',
      },
      {
        district_id: 308,
        district_name: 'Palakkad',
      },
      {
        district_id: 300,
        district_name: 'Pathanamthitta',
      },
      {
        district_id: 296,
        district_name: 'Thiruvananthapuram',
      },
      {
        district_id: 303,
        district_name: 'Thrissur',
      },
      {
        district_id: 299,
        district_name: 'Wayanad',
      },
    ],
  },
]

export { STATES, DISTRICTS }
