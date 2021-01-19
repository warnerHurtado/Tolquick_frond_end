app.use(express.static ('./dist/tolquick-web-app'));



app.get ('/*', function (req, res) { 
  res.sendFile('index.html', {root: 'dist/tolquick-web-app/'} 
  ); 
});

app.listen( process.env.PORT || 8080);


