import {
	Image as FluentImage,
	type ImageProps,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";

interface Props extends ImageProps {
	lqipSrc: string;
	hiResSrc: string;
}

export default function ProgressiveImage({
	lqipSrc,
	hiResSrc,
	...rest
}: Props) {
	const [src, setSrc] = useState(lqipSrc);
	useEffect(() => {
		const img = new Image();
		img.src = hiResSrc;
		img.onload = () => setSrc(hiResSrc);
	}, [hiResSrc]);
	return <FluentImage src={src} {...rest} />;
}
