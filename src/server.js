app.use (express.static ('./dist/tolquick-web-app'));

app.get ('/ *', function (req, res) { 
  res.sendFile ('index.html', {root: 'dist/tolquick-web-app/'} ); 
});

app.listen ( proceso .env.PORT || 8080);


