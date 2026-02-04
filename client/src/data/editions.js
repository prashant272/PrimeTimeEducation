export const EDITIONS = [
  {
    year: 2026,
    path: "/editions/2026",
    title: "Global Healthcare Excellence Awards",
    editionLabel: "3rd Edition",
    locations: ["Dubai", "London"],
    hero: "Celebrating Excellence in Healthcare",
    chiefGuest: {
      name: "Dr. Virender Sehwag",
      photo: "/images/jury1.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Rajesh Kumar",
        hospital: "Apollo Hospitals",
        photo: "/images/jury2.jpeg",
        award: "Best Multispeciality Hospital",
      },
      {
        name: "Dr. Priya Sharma",
        hospital: "Fortis Healthcare",
        photo: "/images/jury3.jpeg",
        award: "Best Doctor of the Year",
      },
    ],
  },
  {
    year: 2025,
    path: "/editions/2025",
    title: "Global Healthcare Excellence Awards",
    editionLabel: "2nd Edition",
    locations: ["Dubai"],
    hero: "Innovation. Impact. Integrity.",
    chiefGuest: {
      name: "Dr. Sunil Gavaskar",
      photo: "/images/jury4.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Amit Patel",
        hospital: "Max Healthcare",
        photo: "/images/jury5.jpeg",
        award: "Best Hospital",
      },
    ],
  },
  {
    year: 2024,
    path: "/editions/2024",
    title: "Global Healthcare Excellence Awards",
    editionLabel: "1st Edition",
    locations: ["New Delhi"],
    hero: "Recognising Leaders & Institutions",
    chiefGuest: {
      name: "Shri Ashwini Kumar Choubey",
      photo: "/images/jury6.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Neha Singh",
        hospital: "AIIMS Delhi",
        photo: "/images/jury7.jpeg",
        award: "Best Government Hospital",
      },
    ],
  },
  {
    year: 2023,
    path: "/editions/2023",
    title: "Global Healthcare Awards",
    editionLabel: "Special Edition",
    locations: ["Mumbai"],
    hero: "Healthcare Champions of the Year",
    chiefGuest: {
      name: "Dr. Yoganand Shashtri",
      photo: "/images/jury8.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Anil Mehta",
        hospital: "Tata Memorial Hospital",
        photo: "/images/jury1.jpeg",
        award: "Best Cancer Care Hospital",
      },
    ],
  },
  {
    year: 2022,
    path: "/editions/2022",
    title: "Global Healthcare Awards",
    editionLabel: "Annual Edition",
    locations: ["Bengaluru"],
    hero: "Driving Better Outcomes",
    chiefGuest: {
      name: "Shri G. V. L. Narsimha Rao",
      photo: "/images/jury2.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Kavita Reddy",
        hospital: "Narayana Health",
        photo: "/images/jury3.jpeg",
        award: "Best Cardiac Care",
      },
    ],
  },
  {
    year: 2021,
    path: "/editions/2021",
    title: "Global Healthcare Awards",
    editionLabel: "Annual Edition",
    locations: ["Hyderabad"],
    hero: "Resilience & Transformation",
    chiefGuest: {
      name: "Mr. Brad Hogg",
      photo: "/images/jury4.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Suresh Kumar",
        hospital: "Yashoda Hospitals",
        photo: "/images/jury5.jpeg",
        award: "Best Patient Care",
      },
    ],
  },
  {
    year: 2020,
    path: "/editions/2020",
    title: "Global Healthcare Awards",
    editionLabel: "Annual Edition",
    locations: ["Virtual"],
    hero: "Honouring Frontline Excellence",
    chiefGuest: {
      name: "Dr. Najma A. Heptulla",
      photo: "/images/jury6.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Meera Patel",
        hospital: "Medanta Hospital",
        photo: "/images/jury7.jpeg",
        award: "Best Telemedicine Initiative",
      },
    ],
  },
  {
    year: 2019,
    path: "/editions/2019",
    title: "Global Healthcare Awards",
    editionLabel: "Annual Edition",
    locations: ["Chennai"],
    hero: "Leadership & Patient Care",
    chiefGuest: {
      name: "Shri Anand Kumar",
      photo: "/images/jury8.jpeg",
      designation: "Chief Guest",
    },
    winners: [
      {
        name: "Dr. Ramesh Iyer",
        hospital: "Apollo Hospitals Chennai",
        photo: "/images/jury1.jpeg",
        award: "Best Hospital Leadership",
      },
    ],
  },
];

export function getEditionByYear(year) {
  const y = Number(year);
  return EDITIONS.find((e) => e.year === y) || null;
}


