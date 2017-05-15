let timer
let eliminated = false

$(function() {
    $('head title').text(config.trans.scoreCounter)
    $('h1').text(config.trans.scoreCounter)
    const backgrounds = ['blue', 'gray', 'black']
    const colors = ['black', 'black', 'white']
    $('.team').each(function() {
        const id = $(this).attr('id').split('-')[1]
        const title = $('<h2>', {
            text: `${config.trans.team} ${id}`,
            css: {
                'textAlign': 'center'
            }
        })
        title.prop('contenteditable', true).css('cursor', 'pointer')
        $(this).append(title)


        const foul = $('<button>', {
            text: config.trans.foul,
            click: function() {
                addFoul(id, 1)
            }
        })
        $(this).append(foul)

        const score = $('<div>', {
            'class': 'score',
            id: `score-${id}`,
            text: 0
        })
        $(this).append(score)

        const space = $('<div>', {
            'class': 'space'
        })
        $(this).append(space)

        const set = $('<div>', {
            'class': 'set',
            text: config.trans.periods,
            css: {
                fontSize: 30,
                textAlign: 'center'
            }
        })
        $(this).append(set)

        const game = $('<div>', {
            'class': 'game',
            id: `game-${id}`,
            text: 0
        })
        $(this).append(game)

        $(this).css('background', backgrounds[id - 1]).css('color', colors[id - 1])
    })

    $('#init').click(function() {
        $.post('init.php', {
            teams: teamsJson()
        }, function() {
            timer = setInterval(update, 1000)
        });
    })
    $('#init').text(config.trans.start)

    $('#reload').click(function() {
        clearTimeout(timer)
        document.location.href = document.location.href
    })
    $('#reload').text(config.trans.new)

    $('#start').click(function() {
        timer = setInterval(update, 1000)
    })
    $('#start').text(config.trans.synchronize)
})

const teamsJson = function() {
    return [$('#team-1').find('h2').text().replace(/_+/g, '_'), $('#team-2').find('h2').text().replace(/_+/g, '_'), $('#team-3').find('h2').text().replace(/_+/g, '_')]
}

const addFoul = function(id, point) {
    $.post('fouls.php', {
        teams: teamsJson(),
        id: id,
        point: point
    }, function(data) {
        const teams = JSON.parse(data)
        Object.keys(teams).forEach(function(id) {
            $(`#score-${id}`).text(teams[id].points)
        })
    })
    update()
}

const update = function() {
    $.get('update.php', {
        teams: teamsJson(),
    }, function(data) {
        let maxScore = 0
        let minScore = Infinity
        let lastTeam = -1

        const teams = JSON.parse(data)
        Object.keys(teams).forEach(function(id) {
            const team = teams[id]

            maxScore = Math.max(maxScore, team.points)
            if (team.points < minScore) {
                minScore = team.points
                lastTeam = id
            }

            $(`#score-${id}`).text(team.points)
            $(`#game-${id}`).text(team.sets)
            $(`#team-${id}`).find('h2').text(team.name)
        })

        if (maxScore > 10) {
            if (!eliminated) {
                eliminated = true
                twoTeams(lastTeam)
            }
        } else {
            eliminated = false
            threeTeams()
            $('.team').css('transform', 'scale(1)').css('z-index', 0)
        }
    })
    $('.game').each(function() {
        if ($(this).text() > 2) {
            $(this).parent().css('transform', 'scale(1.2)').css('z-index', 1)
        }
    })
}

const twoTeams = function(lastTeam) {
    $(`#team-${lastTeam}`).find('button').prop('disabled', true)
    $(`#team-${lastTeam}`).css('opacity', 0)
    $('.set').slideDown()
    $('.game').slideDown()
    $('.set').prop('disabled', false)
}
const threeTeams = function() {
    $('.team').css('opacity', '')
    $('button').prop('disabled', false)
    $('.set').prop('disabled', true)
}
