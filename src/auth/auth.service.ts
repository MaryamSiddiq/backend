import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import AsyncStorage from '@react-native-async-storage/async-storage';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, email: string, password: string) {
    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new UnauthorizedException('User already exists');

    const user = new this.userModel({ username, email, password });
    await user.save();
    return this.generateToken(user);
  }


  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }
  async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }
  private generateToken(user: User) {
    const payload = { id: user._id, username: user.username, email: user.email };
    return { token: this.jwtService.sign(payload), userId: user._id, username: user.username };
  }
}
