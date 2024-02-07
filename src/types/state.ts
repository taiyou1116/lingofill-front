// アプリの状態
export type state = {
    // サイドバー
    showSidebar: boolean,
    flipShowSidebar: () => void,

    // Modal
    showCenterModal: boolean,
    flipCenterModal: () => void,
}