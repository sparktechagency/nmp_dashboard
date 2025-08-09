import OrderDetails from "../../components/order/OrderDetails";

const OrderDetailsPage = () => {
  //const { id } = useParams();
  //const { data, isLoading, isError } = useGetSingleOrderQuery(id);
  //const order = data?.data || {};
  const order = {
        "_id": "689327091e2f9be263084db8",
        "token": "850775",
        "totalPrice": 33146,
        "paymentStatus": "pending",
        "status": "processing",
        "deliveryAt": null,
        "createdAt": "2025-08-06T09:57:29.059Z",
        "shipping": {
            "streetAddress": "1234 Elm Street",
            "city": "Springfield",
            "state": "Illinois (IL)",
            "zipCode": "62704"
        },
        "customerName": "QA Tester",
        "customerEmail": "afrin4axiz@gmail.com",
        "customerPhone": "01711010266",
        "products": [
            {
                "productId": "688b30f1d52606dbf83bce11",
                "name": "Basketball",
                "price": 80,
                "quantity": 1,
                "total": 80,
                "image": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753952500/MTK-Ecommerce/sedjgkwozcmlngrqiurx.jpg",
                "size": "S",
                "colorName": "Orange",
                "colorHexCode": "#FFA500"
            },
            {
                "productId": "6884c69a8ea15d59086a2d54",
                "name": "Assorted booster Packs",
                "price": 66,
                "quantity": 1,
                "total": 66,
                "image": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753961002/MTK-Ecommerce/dw4yrycttj36zt4rwvnp.jpg",
                "size": "XS",
                "colorName": "Gray",
                "colorHexCode": "#808080"
            },
            {
                "productId": "6891c1b8c358e8d234263d2e",
                "name": "Toremmm",
                "price": 8000,
                "quantity": 1,
                "total": 8000,
                "image": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1754382779/MTK-Ecommerce/ttydeytp10plmqgk3xjt.jpg",
                "size": "S",
                "colorName": "Vanilla",
                "colorHexCode": "#fdfcf7"
            }
        ]
    }

  // if (isLoading) {
  //   return <OrderLoading />
  // }

  // if (!isLoading && isError) {
  //   return <ServerErrorCard />
  // }

  // if (!isLoading && !isError && !order?._id) {
  //   return <h1>Product Not Found</h1>
  // }

  // if (!isLoading && !isError && order?._id) {
  //   return (
  //     <>
  //       <OrderDetails order={order}/>
  //     </>
  //   )
  // }

  return (
      <>
        <OrderDetails order={order}/>
      </>
    )
}

export default OrderDetailsPage