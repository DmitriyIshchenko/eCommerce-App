import {
	AD,
	AT,
	BE,
	BG,
	BR,
	CA,
	CH,
	CU,
	CY,
	DE,
	DK,
	ES,
	FR,
	GR,
	HR,
	IS,
	IT,
	JP,
	LI,
	LT,
	LU,
	LV,
	MC,
	MX,
	NL,
	NO,
	PL,
	PT,
	RO,
	RS,
	SE,
	SI,
	SK,
	SM,
	TR,
	US,
} from "country-flag-icons/react/3x2";

export const countries: Record<
	string,
	{
		country: string;
		component: JSX.Element;
		zipRegex: string;
		zipFormat: string;
	}
> = {
	Andorra: {
		country: "Andorra",
		component: <AD width={24} />,
		zipRegex: "^AD(\\d{3})$",
		zipFormat: "AD###",
	},
	Austria: {
		country: "Austria",
		component: <AT width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Belgium: {
		country: "Belgium",
		component: <BE width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Brazil: {
		country: "Brazil",
		component: <BR width={24} />,
		zipRegex: "^\\d{5}-\\d{3}$",
		zipFormat: "#####-###",
	},
	Bulgaria: {
		country: "Bulgaria",
		component: <BG width={24} />,
		zipRegex: "^(\\d{4})$",
		zipFormat: "####",
	},
	Canada: {
		country: "Canada",
		component: <CA width={24} />,
		zipRegex:
			"^[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z] ?\\d[ABCEGHJ-NPRSTV-Z]\\d$",
		zipFormat: "A#A #A#",
	},
	Croatia: {
		country: "Croatia",
		component: <HR width={24} />,
		zipRegex: "HR\\-(\\d{5})",
		zipFormat: "HR-#####",
	},
	Cuba: {
		country: "Cuba",
		component: <CU width={24} />,
		zipRegex: "CP\\s(\\d{5})",
		zipFormat: "CP #####",
	},
	Cyprus: {
		country: "Cyprus",
		component: <CY width={24} />,
		zipRegex: "^(\\d{4})$",
		zipFormat: "####",
	},
	Denmark: {
		country: "Denmark",
		component: <DK width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	France: {
		country: "France",
		component: <FR width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Germany: {
		country: "Germany",
		component: <DE width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Greece: {
		country: "Greece",
		component: <GR width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Iceland: {
		country: "Iceland",
		component: <IS width={24} />,
		zipRegex: "^\\d{3}$",
		zipFormat: "###",
	},
	Italy: {
		country: "Italy",
		component: <IT width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Japan: {
		country: "Japan",
		component: <JP width={24} />,
		zipRegex: "^(\\d{3})-(\\d{4})$",
		zipFormat: "###-####",
	},
	Latvia: {
		country: "Latvia",
		component: <LV width={24} />,
		zipRegex: "^LV-(\\d{4})$",
		zipFormat: "LV-####",
	},
	Lithuania: {
		country: "Lithuania",
		component: <LT width={24} />,
		zipRegex: "LT-(\\d{5})",
		zipFormat: "LT-#####",
	},
	Mexico: {
		country: "Mexico",
		component: <MX width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Monaco: {
		country: "Monaco",
		component: <MC width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Liechtenstein: {
		country: "Liechtenstein",
		component: <LI width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Luxembourg: {
		country: "Luxembourg",
		component: <LU width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Netherlands: {
		country: "Netherlands",
		component: <NL width={24} />,
		zipRegex: "^\\d{4} ?[A-Z]{2}$",
		zipFormat: "#### AA",
	},
	Norway: {
		country: "Norway",
		component: <NO width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Poland: {
		country: "Poland",
		component: <PL width={24} />,
		zipRegex: "^\\d{2}-\\d{3}$",
		zipFormat: "##-###",
	},
	Portugal: {
		country: "Portugal",
		component: <PT width={24} />,
		zipRegex: "^\\d{4}-\\d{3}$",
		zipFormat: "####-###",
	},
	Romania: {
		country: "Romania",
		component: <RO width={24} />,
		zipRegex: "^(\\d{6})$",
		zipFormat: "######",
	},
	"San Marino": {
		country: "San Marino",
		component: <SM width={24} />,
		zipRegex: "^(4789\\d)$",
		zipFormat: "4789#",
	},
	Serbia: {
		country: "Serbia",
		component: <RS width={24} />,
		zipRegex: "^(\\d{6})$",
		zipFormat: "######",
	},
	Slovakia: {
		country: "Slovakia",
		component: <SK width={24} />,
		zipRegex: "^(\\d{5})$",
		zipFormat: "#####",
	},
	Slovenia: {
		country: "Slovenia",
		component: <SI width={24} />,
		zipRegex: "^SI-(\\d{4})$",
		zipFormat: "SI-####",
	},
	Spain: {
		country: "Spain",
		component: <ES width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	Sweden: {
		country: "Sweden",
		component: <SE width={24} />,
		zipRegex: "^SE-(\\d{3})\\s(\\d{2})$",
		zipFormat: "SE-### ##",
	},

	Switzerland: {
		country: "Switzerland",
		component: <CH width={24} />,
		zipRegex: "^\\d{4}$",
		zipFormat: "####",
	},
	Turkey: {
		country: "Turkey",
		component: <TR width={24} />,
		zipRegex: "^\\d{5}$",
		zipFormat: "#####",
	},
	USA: {
		country: "USA",
		component: <US width={24} />,
		zipRegex: "^\\d{5}-(\\d{4})$",
		zipFormat: "#####-####",
	},
};

export const countryOptions = Object.values(countries).map((v) => ({
	children: (
		<span style={{ display: "flex", columnGap: 8, marginLeft: 3 }}>
			{v.component}
			{v.country}
		</span>
	),
	value: v.country,
}));
