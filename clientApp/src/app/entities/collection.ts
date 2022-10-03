export class Collections {
    id?: number;
    colName?: string;
    description?: string;
    icon?: string;
    likes?: number;
}

export class GithubRepo {
    name?: string;
    html_url?: string;
    description?: string;
    forks_count?: number;
    stargazers_count?: number;
}

export class Experience {
    id?: number;
    category?: string;
    expName?: string;
    percentage?: number;
}

export class GroupExperience {
    cat?: string
    items: Array<Experience> = [];
}

export class HistoryProfile {
    id?: number;
    historyDate?: string;
    typeH?: number;
    title?: string;
    company?: string;
    description?: string;
}