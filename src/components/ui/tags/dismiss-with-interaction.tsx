import { Tag, TagGroup, makeStyles } from "@fluentui/react-components";
import { useEffect, useRef } from "react";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: "10px",
	},
	tagGroup: {
		flexWrap: "wrap",
	},
	tag: {
		paddingLeft: "10px",
		paddingRight: "10px",
		"> span": {
			padding: 0,
		},
	},
});

export interface TagProps {
	value: string;
	children: string;
}

export default function DismissWithInteractionTags({
	tags,
}: { tags: TagProps[] }) {
	const useResetExample = (visibleTagsLength: number) => {
		const firstTagRef = useRef<HTMLButtonElement>(null);

		const prevVisibleTagsLengthRef = useRef<number>(visibleTagsLength);
		useEffect(() => {
			if (prevVisibleTagsLengthRef.current === 0) {
				firstTagRef.current?.focus();
			}

			prevVisibleTagsLengthRef.current = visibleTagsLength;
		}, [visibleTagsLength]);

		return { firstTagRef };
	};

	const { firstTagRef } = useResetExample(tags.length);

	const styles = useStyles();

	return (
		<>
			{tags.length !== 0 && (
				<TagGroup className={styles.tagGroup} aria-label="Dismiss example">
					{tags.map((tag, index) => (
						<Tag
							key={tag.children}
							ref={index === 0 ? firstTagRef : null}
							shape="circular"
							size="small"
							className={styles.tag}
							primaryText={tag.children}
						/>
					))}
				</TagGroup>
			)}
		</>
	);
}
