export type ErrorPageProps = {
    code: string;
    message: string;
    subText: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonAction: () => void;
    secondaryButtonAction: () => void;
}