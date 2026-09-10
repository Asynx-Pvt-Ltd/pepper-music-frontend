import { NextPage } from 'next';
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| null;
	size?: 'sm' | 'lg' | 'icon';
	children: React.ReactNode;
}

const GlobalButton: NextPage<Props> = ({
	children,
	variant,
	className,
	size,
	...props
}) => {
	return (
		<Button
			variant={variant}
			className={`bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer ${className}`}
			size={size ? size : 'lg'}
			{...props}
		>
			{children}
		</Button>
	);
};

export default GlobalButton;
