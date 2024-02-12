// アプリ全体で共有する状態の型
export type state = {
    // サイドバー
    showSidebar: boolean,
    flipShowSidebar: () => void,

    // CenterModal
    showCenterModal: boolean,
    flipCenterModal: () => void,

    text: string,
    setText: (text: string) => void,

    // user情報
    username: string,
    setUsername: (username: string) => void,
}