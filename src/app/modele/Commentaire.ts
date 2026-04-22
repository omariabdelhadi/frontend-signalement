export interface Commentaire{
    id: number,
    contenue: string,
    date: Date,
    signalementId: number,
    UserId: number
    nomuser:string
    role: string
    parentId: number
    userNameParent: string
    ContenueCommentaireParent: string
    reponses: Array<Commentaire>
    showForm?: boolean
    showReponses?: boolean
    likes: number
    UserIdLike: Array<number>
    AdminIdLike: Array<number>
}