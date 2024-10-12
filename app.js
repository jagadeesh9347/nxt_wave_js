let express = require('express')
let app = express()
let {open} = require('sqlite')
let dbdriver = require('sqlite3')
let path = require('path')
let dbpath = path.join(__dirname, 'cricketTeam.db')
let intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: dbdriver,
    })
    app.listen(3000, () => {
      console.log('server is running at http://localhost3000')
    })
  } catch (e) {
    console.log(`DBError:${e.message}`)
    process.exit(1)
  }
}
intializeDBAndServer()

//get method for all

app.get('/players', async (request, responce) => {
  let getplayersdetails = `
    SELECT * FROM cricket_team
    ORDER BY
     player_id;
    `
  let res = await db.all(getplayersdetails)
  response.send(res)
})
//get for single book
app.get(`/players/:playerId/`, async (request, responce) => {
  let {id} = request.params
  let getplayersdetails = `
    SELECT * FROM cricket_team
    WHERE
     player_id=${id};
    `
  let res = await db.get(getplayersdetails)
  response.send(res)
})

//post method
app.use(express.json())
app.post('/players/', async (request, response) => {
  let content = request.body
  let {player_name, jersey_number, role} = content
  let addplayer = `
  INSERT INTO 
  cricket_team(player_name, jersey_number, role)
  VALUES(
    ${player_name},
    ${jersey_number},
    ${role}
  ) `
  let final = await db.run(addplayer)
  let responseid = final.lastId
  response.send('Player Added to Team')
})
//put method
app.put(`/players/:playerId/`, async (request, response) => {
  let {id} = request.params
  let data = request.body
  let {player_id, player_name, jersey_number, role} = content
  let update_book = `
      UPDATE 
      cricket_team
      SET 
      player_id=${player_id},
      player_name=${player_name},
      jersey_number=${jersey_number},
      role=${role}
      WHERE 
      player_id=${id}
      `
  await db.run(update_book)
  response.send('Player Details Updated')
})
//delete
app.delete(`/players/:playerId/`, async (request, response) => {
  let {id} = request.params
  let delete_one = `
  DELETE FROM 
  cricket_team
  WHERE
  playerId:${id};
  `
  await db.run(delete_one)
  response.send('Player Removed')
})

module.exports = app
