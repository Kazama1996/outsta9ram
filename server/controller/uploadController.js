const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
const { catchAsync } = require("../utils/catchAsync");
const { v4 } = require("uuid");

const createPresignUrlWithClient = async ({ region, bucket, key }) => {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    },
  });
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: "image/*",
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

exports.getPreSignUrl = async (req, res) => {
  const REGION = "ap-northeast-1";
  const BUCKET = "outsta9ram-bucket";
  const KEY = `${req.user.id}/${v4()}.jpeg`; //有待商卻
  const clientUrl = await createPresignUrlWithClient({
    region: REGION,
    bucket: BUCKET,
    key: KEY,
  });
  res.status(200).send({ KEY, clientUrl });
};
