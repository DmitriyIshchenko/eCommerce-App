import {
	Carousel,
	type CarouselAnnouncerFunction,
	CarouselCard,
	CarouselNav,
	CarouselNavButton,
	CarouselNavContainer,
	CarouselSlider,
	CarouselViewport,
	Image,
	makeStyles,
	tokens,
	typographyStyles,
} from "@fluentui/react-components";

import { Link } from "@tanstack/react-router";
import img1 from "../../assets/images/18th-century-french-botanical-illustration-tradescantia-rosea-14968130109507.webp";
import img2 from "../../assets/images/a-general-view-of-the-animal-kingdom-6194567708715.webp";
import img3 from "../../assets/images/astronomy-101-art-earth-5990881329195.webp";
import img4 from "../../assets/images/tribute-tree.webp";

const useClasses = makeStyles({
	bannerCard: {
		alignContent: "center",
		borderRadius: tokens.borderRadiusLarge,
		height: "100vh",
		textAlign: "left",
		position: "relative",
	},
	cardContainer: {
		display: "flex",
		flexDirection: "column",
		gap: "8px",

		position: "absolute",
		left: "10%",
		top: "25%",
		background: tokens.colorNeutralBackground1,
		padding: "18px",
		maxWidth: "270px",
		width: "50%",
	},
	title: {
		...typographyStyles.title1,
	},
	subtext: {
		...typographyStyles.body1,
	},
});

const IMAGES = [
	{ src: img1, text: "Our first celestial masterpiece" },
	{ src: img2, text: "Our second celestial masterpiece" },
	{ src: img3, text: "Our third celestial masterpiece" },
	{ src: img4, text: "Our fourth celestial masterpiece" },
];

const BannerCard: React.FC<{
	children: React.ReactNode;
	imageSrc: string;
	index: number;
	text: string;
}> = (props) => {
	const { children, imageSrc, index, text } = props;
	const classes = useClasses();

	return (
		<CarouselCard
			className={classes.bannerCard}
			aria-label={`${index + 1} of ${IMAGES.length}`}
			id={`test-${index}`}
		>
			<Image fit="cover" src={imageSrc} role="presentation" />

			<div className={classes.cardContainer}>
				<div className={classes.title}>{children}</div>
				<div className={classes.subtext}>{text}</div>
				<div>
					<Link to={"/"}>Product1</Link>
				</div>
			</div>
		</CarouselCard>
	);
};

const getAnnouncement: CarouselAnnouncerFunction = (
	index: number,
	totalSlides: number,
) => {
	return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export default function HeroCarousel() {
	return (
		<Carousel
			groupSize={1}
			circular
			announcement={getAnnouncement}
			motion={"fade"}
			autoplayInterval={2000}
		>
			<CarouselViewport>
				<CarouselSlider>
					{IMAGES.map((v, i) => (
						<BannerCard
							key={`image-${i}`}
							imageSrc={v.src}
							index={i}
							text={v.text}
						>
							Card {i + 1}
						</BannerCard>
					))}
				</CarouselSlider>
			</CarouselViewport>
			<CarouselNavContainer
				style={{ visibility: "hidden" }}
				layout="inline"
				autoplay={{
					"aria-label": "Enable autoplay",
					checked: true,
				}}
				nextTooltip={{ content: "Go to next", relationship: "label" }}
				prevTooltip={{ content: "Go to prev", relationship: "label" }}
			>
				<CarouselNav>
					{(index) => (
						<CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
					)}
				</CarouselNav>
			</CarouselNavContainer>
		</Carousel>
	);
}
