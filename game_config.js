const game_config = 
{   
    3: {
        roles: ['werewolf', 'werewolf', 'seer', 'villager', 'villager'],
        order: ['seer'],
        night_duration: 15,
        day_duration: 140
    },

    4: {
        roles: ['werewolf', 'werewolf', 'seer', 'villager', 'villager', 'villager'],
        order: ['seer'],
        night_duration: 15,
        day_duration: 180
    }
}

module.exports = game_config;