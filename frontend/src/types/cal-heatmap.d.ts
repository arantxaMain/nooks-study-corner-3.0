declare module 'cal-heatmap' {
    interface CalHeatmapOptions {
        itemSelector: HTMLElement;
        domain?: {
            type: string;
            gutter?: number;
            label?: {
                text?: string;
                textAlign?: string;
                position?: string;
                display?: string;
            };
        };
        subDomain?: {
            type: string;
            width?: number;
            height?: number;
            radius?: number;
            gutter?: number;
            label?: (timestamp: number, value: number) => string;
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
                range: string[] | number;
                domain: number[];
                scheme?: string;
            };
        };
        verticalOrientation?: boolean;
        theme?: 'light' | 'dark';
        options?: {
            theme?: 'light' | 'dark';
        };
    }

    class CalHeatmap {
        constructor();
        paint(options: CalHeatmapOptions): void;
        destroy(): void;
    }

    export = CalHeatmap;
}