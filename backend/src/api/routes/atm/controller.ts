import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Location } from 'domain/entities/Location';
import { getAtmList } from 'domain/use_cases/getAtmList';
import {atmRepository, transactionRepository} from "root/src/gateways";
import {decrypt} from "root/src/lib/encryption";
import moment = require("root/node_modules/moment");

export async function getAtmListHandler(req: Request, res: Response): Promise<Response> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const locationQuery = req.query;
  const location = locationQuery as Location;

  const atmList = await getAtmList(location);

  return res.json(atmList);
}

export async function getValidateQrCodeHandler(req: Request, res: Response): Promise<Response> {
  // todo authorization secret id from atm..
  const {res_id, qr_code} = req.body;

  try {
    const qr_code_data = JSON.parse(decrypt(qr_code));
    const transaction = await transactionRepository.findByReservationIdAndQrCode(res_id, qr_code);
    const atm_id = transaction.atm;

    const now = moment().utc();
    if (moment(qr_code_data.valid_until).isBefore(now) && transaction.type === 'RESERVE') {

      const atm = await atmRepository.findOneById(atm_id);
      const nextBalance = atm.balance - qr_code_data.amount;
      await atmRepository.update(atm_id, {balance: nextBalance});
      await transactionRepository.update(res_id, {type: 'WITHDRAW'});
    }
    return res.status(400).json({errors: ['QR Code has expired or already used.']});
  } catch (err) {
    return res.status(400).json({errors: err.toString()});
  }
}
