const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { eq } = require('sequelize/types/lib/operators');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // finds all tags
  Tag.findAll ({
    attributes:['id', 'tag_name'],
  // associated Product data
    include: [
      {
        model: Product,
        attributes: ['id','category_id','price','stock','product_name'],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
});

router.get('/:id', (req, res) => {
  // finds a single tag by its `id`
  Tag.findOne ({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
  //  includes its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id','category_id','price','stock','product_name'],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
});

router.post('/', (req, res) => {
  // creates a new tag
  Tag.create ({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
});

router.put('/:id', (req, res) => {
  // updates a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  })
  .then(dgTagData => {
    if (!dbTagData) {
      res.status(404).json({
        //returns 404 status if not a valid id
        message: 'No tag found with this id'
      });
      return;
    }
    res.json(dbTagData);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({
        message: 'No tag found with this id'
      });
      return;
    }
    res.json(dbTagData);
  })
});

module.exports = router;
