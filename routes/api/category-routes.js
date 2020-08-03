const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finds all categories
  Category.findAll ({
  // includes its associated Products
    include: [
      {
        model: Product,
        attributes: ['id','category_id','price','stock','product_name'],
      }
    ]
    }).then(dbData => {
      res.json(dbData)
  })
});

router.get('/:id', (req, res) => {
  // finds one category by its `id` value
  Category.findOne ({
    where: {
      id: req.params.id
    },
  // includes its associated Products
    include: [
      {
        model: Product,
        attributes: ['id','category_id','price','stock','product_name'],
      }
    ]
  }).then(dbData => {
    res.json(dbData)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create ({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
});

router.put('/:id', (req, res) => {
  // updates a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
.then(dbCategoryData => {
  if (!dbCategoryData) {
      res.status(404).json({
          message: 'Could not find post with this id'
      });
    return;
  }
  res.json(dbCategoryData);
  })
});

router.delete('/:id', (req, res) => {
  // deletes a category by its `id` value
  Category.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({
            message: 'No category located with specified id'
        });
        return;
    }
    res.json(dbPostData);
    })
});


module.exports = router;
