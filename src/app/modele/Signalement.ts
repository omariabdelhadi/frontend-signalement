export interface Signalement {

    id: number
    titre: string
    description: string 
    image: string
    Localisation: string
    statue: 'NOUVEAU' | 'EN_COURS' | 'RESOLU' | 'REJETE'
    userId: number
    EtatCompe: string
    date: Date,
}