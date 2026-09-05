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
		<div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
			<AlertTriangle className="mx-auto h-8 w-8 text-white/40" />
			<h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
			<p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-gray-400">
				{message}
			</p>
			{(retryAction || customAction) && (
				<div className="mt-6 flex justify-center gap-3">
					{retryAction && (
						<button
							type="button"
							onClick={retryAction}
							className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
						>
							Try again
						</button>
					)}
					{customAction && (
						<button
							type="button"
							onClick={customAction.onClick}
							className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
						>
							{customAction.label}
						</button>
					)}
				</div>
			)}
		</div>
	);
};
