const express = require('express');
const fs = require('fs');

const router = express.Router();

const companies = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/companyData.json`)
);

const getAllCompanies = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: companies,
  });
};

const getCompany = (req, res) => {
  const id = req.params.id * 1;
  const company = companies.find((ele) => ele.id === id);
  if (!company) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  console.log(company);
  res.status(200).json({
    status: 'success',
    data: {
      company,
    },
  });
};

const createCompany = (req, res) => {
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

const deleteCompany = (req, res) => {
  if (req.params.id * 1 > companies.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const updateCompany = (req, res) => {
  if (req.params.id * 1 > companies.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      company: '<Updated company here...>',
    },
  });
};

router.route('/:id').get(getCompany).patch(updateCompany).delete(deleteCompany);

router.route('/').get(getAllCompanies).post(createCompany);

module.exports = router;
