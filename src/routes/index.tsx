import { createFileRoute } from "@tanstack/react-router";
import ProgressiveImage from "../components/ui/images/progressive";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			{/* <ProgressiveImage lqipSrc="https://iili.io/3sZMoiX.jpg" src="https://iili.io/3sZotUu.webp" width={800}/> удалённый хостинг картинок, можно выбрать сервис который сразу и lqip сгенерит */}
			<ProgressiveImage
				lqipSrc="images/lqip/tribute-tree.webp"
				hiResSrc="images/hi-res/tribute-tree.webp"
				width={800}
			/>
			{/* хранение на фронтенде как public ресурс */}
		</div>
	);
}
