import { Surface } from '@/components/shared/page/parts';
import { getCommandsOrFallback } from '@/lib/bot-catalogue';

/**
 * The full command set on the home page, read from the bot's catalogue so it
 * stays in step with what Pepper actually registers.
 */
const CommandGrid: React.FC = async () => {
	const { commands } = await getCommandsOrFallback();

	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{commands.map((command) => (
				<Surface key={command.name} interactive className="px-4 py-3.5">
					<code className="font-mono text-sm font-semibold text-foreground">
						/{command.name}
					</code>
					<p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
						{command.description}
					</p>
				</Surface>
			))}
		</div>
	);
};

export default CommandGrid;
