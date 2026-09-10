import React from 'react';
import { AlertTriangle } from 'lucide-react';

import { ErrorComponentProps } from '@/types';

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
	title = 'Something went wrong',
	message = "We couldn't load the data you requested. Please try again later.",
	retryAction,
	customAction,
}) => {
	return (
		<div className="rounded-lg border border-border bg-surface px-6 py-12 text-center">
			<AlertTriangle className="mx-auto h-8 w-8 text-foreground/55" />
			<h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
			<p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
				{message}
			</p>
			{(retryAction || customAction) && (
				<div className="mt-6 flex justify-center gap-3">
					{retryAction && (
						<button
							type="button"
							onClick={retryAction}
							className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-surface-hover"
						>
							Try again
						</button>
					)}
					{customAction && (
						<button
							type="button"
							onClick={customAction.onClick}
							className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-surface-hover"
						>
							{customAction.label}
						</button>
					)}
				</div>
			)}
		</div>
	);
};
