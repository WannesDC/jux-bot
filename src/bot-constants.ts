export const BotConstants = {
    ROLES: {
        CLOGS_ROLE: 'clogs',
        STEP_LEADER_ROLE: 'Step Leaders',
        SUPER_ADMIN: '1'
    },
    COMMANDS: {
        PING: 'ping',
        QUOTES: 'quotes',
        ADDQUOTES: 'addquote',
        STOCK: 'stock',
        USER: 'user',
        HELP: 'help',
        ADMIN: {
            ADD_ADMIN_CHANNEL: 'addadminchannel',
            DELETE_ADMIN_CHANNEL: 'deleteadminchannel',
            GENERATE_DB: 'gndb',
            ADD_ROLE: 'addrole',
            ADD_USER_ROLE: 'assignrole',
            ADD_USER: 'adduser',
            DELETEQUOTES: 'deletequote'
        },
        DESC: {
            PING: 'Pong!',
            QUOTES: 'Generates a random quote (or give an ID!)',
            ADDQUOTES: 'Add a quote',
            STOCK: 'Gives you information about witchcraft.',
            USER: 'Displays the profile information of a User.',
            HELP: 'This... duh..',
            ADMIN: {
                ADD_ADMIN_CHANNEL: 'addadminchannel',
                DELETE_ADMIN_CHANNEL: 'deleteadminchannel',
                GENERATE_DB: 'Generate the database',
                ADD_ROLE: 'addrole',
                ADD_USER_ROLE: 'assignrole',
                ADD_USER: 'adduser',
                DELETEQUOTES: 'deletequote'
            }


        }
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
    INFO: {
        COMMAND_LIST: {
            TITLE: 'List o\' Commands',
            DESC: 'Here is a list of possible commands: ',
            COMMAND_TITLE: 'Command',
            COMMAND_DESC: 'Description (what it does)',
            FOOTER: 'JUX HQ - !Help command',
        }
    },
    ERROR: {
        NOT_IMPLEMENTED: 'Sorry, this isn\'t ready yet',
        PLAYER_ID: 'I\'m sorry I couldn\'t find a user with id: ',
        PLAYER_ID_NO_NUMBER: 'potato, use an actual ID please',
        NO_ID: 'Seems you forgot to give me an ID!',
        ARGUMENT_ERROR: 'Are you sure you provided everything I need?',
        NO_ADMIN: 'You are not an admin of this bot!',
    },
    PROFILE: {
        DESCRIPTION: 'Level $1 of $2',
        NOFAC_DESCRIPTION: 'Level $1',
        TITLE: '$1 [$2]',
        FOOTER: 'JUX HQ - !User command',
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
            NOFACTION: '$1 is not in a faction',
            COMPANY: '$1 in $2',
            NOCOMPANY: '$1 works in the $2',
            MARRIAGE: 'Married to [$1 [$2]]($3) for $4 days',
            NOMARRIAGE: 'Forever Alone',
            LINKS: '[Attack]($1) | [Bounty]($2) | [Message]($3) | [Send Cash]($4) | [Trade]($5)'

        }
    },
    QUOTE: {
        TITLE: 'Quote: ',
        SAVED: 'Saved by $1 on $2',
        ADDED: 'thank you, I have added your quote!',
        DELETED: 'I deleted quote with ID: '
    }
}