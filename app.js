// ... previous code ...
app.post('/calculate', (req, res) => {
  const salary = Number(req.body.salary);
  // For now, static categories
  const expenses = [
    { category: 'Food', amount: salary * 0.2 },
    { category: 'Transport', amount: salary * 0.1 },
    { category: 'Leisure', amount: salary * 0.1 },
    { category: 'Savings', amount: salary * 0.3 },
    { category: 'Other', amount: salary * 0.3 },
  ];
  res.render('index', { user: null, budgetData: { salary, expenses } });
});