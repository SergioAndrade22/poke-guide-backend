var puppeteer = require("puppeteer")
var getPokemonByName = require('./pokemon')

const wtf = {
    'diamondpearl': '/gymleaders.shtml',
}

const wtf2 = {
    'platinum': 'gyms.shtml',
    'heartgoldsoulsilver': 'gym.shtml',
}

const GAME_URLS = {
    'rb': 'gyms.shtml',
    'yellow': 'gyms.shtml',
    'gs': 'gyms.shtml',
    'crystal': 'gyms.shtml',
    'fireredleafgreen': 'gyms.shtml',
    'emerald': 'gym.shtml',
    'rubysapphire': 'gyms.shtml',
    'blackwhite': 'gyms.shtml',
    'black2white2': 'gyms.shtml',
    'xy': 'gyms.shtml',
    'omegarubyalphasapphire': 'gyms.shtml',
    'letsgopikachueevee': 'gyms.shtml',
}

const fetchAllLeaders = async (game) => {
    // Start a Puppeteer session with:
    // - an invisible browser (`headless: true` - less cluttering while executing your app)
    // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    })

    // Open a new page
    const page = await browser.newPage()

    // Include function inside browser to call during page evaluation
    // if removed getPokemonByName in line 68 would be undefined
    await page.exposeFunction('getPokemonByName', getPokemonByName)

    // On this new page:
    // - open the desired website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto(`https://www.serebii.net/${game}/${GAME_URLS[game]}`, {
        waitUntil: "domcontentloaded",
    })

    // Get page data
    const leaders = await page.evaluate(async () => {
        // Fetch all the elements that meet your criteria
        // Gets the elements and returns them
        const rows = document.querySelectorAll(".trainer>tbody>tr:nth-child(2)")

        // Convert the rows to an iterable array
        // For each row fetch the required information
        const mappedRows = []

        for (let row of Array.from(rows)) {
            const names = row.children
            const leader = names[0].innerText
            const pokemons = []

            for (let i = 1; i < names.length; i++) {
                let name = names[i].innerText
                let pokemon = await getPokemonByName(name.toLowerCase().replace(".", "").replace(" ", "-"))
                pokemons.push(pokemon)
            }

            mappedRows.push({ leader, pokemons })
        };

        return mappedRows
    });

    // Close the browser
    await browser.close()

    // Display the results
    return leaders
}

module.exports = fetchAllLeaders