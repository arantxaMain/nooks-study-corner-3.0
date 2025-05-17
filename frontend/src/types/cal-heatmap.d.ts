declare module 'cal-heatmap' {
    interface CalHeatmapOptions {
        itemSelector: HTMLElement;
        domain?: {
            type: string;
            gutter?: number;
            label?: {
                display?: string;
            };
        };
        subDomain?: {
            type: string;
            width?: number;
            height?: number;
            radius?: number;
            gutter?: number;
        };
        data?: Record<number, number> | {
            source: Array<{
                date: string | number;
                value: number;
            }>;
        };
        range?: number;
        date?: {
            start: Date;
            highlight?: Date;
        };
        scale?: {
            color: {
                type: string;
                range: string[];
                domain: number[];
            };
        };
        verticalOrientation?: boolean;
    }

    class CalHeatmap {
        constructor();
        paint(options: CalHeatmapOptions): void;
        destroy(): void;
    }

    export = CalHeatmap;
}