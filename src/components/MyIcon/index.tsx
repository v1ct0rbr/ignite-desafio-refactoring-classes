import { IoImage, IoDocumentTextSharp, IoPricetagOutline, IoRestaurant } from 'react-icons/io5';

interface IconProps {
	type: string;
	size: number;
}

function getIcon(type: string, size: number) {
	if (typeof type != 'undefined')
		switch (type) {
			case 'image':
				return <IoImage height={size} width={size} />;
			case 'description':
				return <IoDocumentTextSharp height={size} width={size} />;
			case 'price':
				return <IoPricetagOutline height={size} width={size} />;

			default:
				return <IoRestaurant height={size} width={size} />;
		}
}

export function Icon({ type, size }: IconProps) {
	return <>{getIcon(type, size)}</>;
}
