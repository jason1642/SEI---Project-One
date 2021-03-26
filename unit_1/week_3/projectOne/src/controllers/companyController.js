const fs = require('fs');

const companies = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/companyData.json`)
);

exports.checkID = (req, res, next, val) => {
  if (val > companies.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};

exports.getAllCompanies = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: companies,
  });
};

exports.getCompany = (req, res) => {
  const id = req.params.id * 1;
  const company = companies.find((ele) => ele.id === id);

  console.log(company);
  res.status(200).json({
    status: 'success',
    data: {
      company,
    },
  });
};

exports.createCompany = (req, res) => {
  console.log(req.body);
  const newId = companies[companies.length - 1].id + 1;
  const newCompany = Object.assign({ id: newId }, req.body);
  companies.push(newCompany);
  fs.writeFile(
    `${__dirname}/data/companyData.json`,
    JSON.stringify(companies),
    (err) => {
      //  201 status code means created
      res.status(201).json({
        status: 'success',
        data: {
          company: newCompany,
        },
      });
    }
  );
};

exports.deleteCompany = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.updateCompany = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      company: '<Updated company here...>',
    },
  });
};
