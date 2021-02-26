export const BotConstants = {
    ROLES: {
        CLOGS_ROLE: 'clogs',
        STEP_LEADER_ROLE: 'Step Leaders'
    },
    COMMANDS: {
        PING: 'ping',
        QUOTES: 'quotes',
        STOCK: 'stock',
        USER: 'user'
    },
    URL: {
        PROFILE: 'https://www.torn.com/profiles.php?XID=',
        FACTION: 'https://www.torn.com/factions.php?step=profile&ID=',
        LOGO: 'https://i.imgur.com/iJyreUG.png',
        ATTACK: 'https://www.torn.com/loader.php?sid=attack&user2ID=',
        BOUNTY: 'https://www.torn.com/bounties.php?p=add&XID=',
        MESSAGE: 'https://www.torn.com/messages.php#/p=compose&XID=',
        SEND_CASH: 'https://www.torn.com/sendcash.php#/XID=',
        TRADE: 'https://www.torn.com/trade.php#step=start&userID='
    },
    ERROR: {
        PLAYER_ID: 'I\'m sorry I couldn\'t find a user with id: ',
        PLAYER_ID_NO_NUMBER: 'potato, use an actual ID please',
        NO_ID: 'Seems you forgot to give me an ID!'
    },
    PROFILE: {
        DESCRIPTION: 'Level $1 of $2',
        TITLE: '$1 [$2]',
        FOOTER:'JUX HQ - !User command',
        TITLES: {
            LIFE: ' Life',
            STATUS: 'Status',
            FACTION: 'Faction',
            COMPANY: 'Company',
            COMPANY_TYPE: 'Company Type',
            MARRIAGE: 'Marriage',
            LINKS: 'Links'
        },
        DESCRIPTIONS: {
            LIFE: '$1/$2',
            FACTION: '$1 of [$2 [$3]]($4) for $5 days',
            COMPANY: '$1 in $2',
            MARRIAGE: 'Married to [$1 [$2]]($3) for $4 days',
            LINKS: '[Attack]($1) | [Bounty]($2) | [Message]($3) | [Send Cash]($4) | [Trade]($5)'

        }

    }
}